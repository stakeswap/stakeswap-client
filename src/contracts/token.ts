// import invariant from 'invariant';
import { BigNumber, ethers } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import invariant from 'invariant';
import { atom, Getter, Setter, WritableAtom } from 'jotai';
import { Pair, Pair__factory, Staking, Staking__factory } from '../typechain';
import { ERC20__factory } from '../typechain/factories/lib/openzeppelin-contracts/contracts/token/ERC20';
import { ERC20 } from '../typechain/lib/openzeppelin-contracts/contracts/token/ERC20';
// eslint-disable-next-line import/no-cycle
import { factoryAtom, routerAtom, signerAtom, WETHAtom } from './common';

// TOKEN BALANCE / ALLOWANCE
export const fromTokenBalanceAtom = atom<BigNumber>(BigNumber.from(0)); // from token balance of user
export const fromTokenAllowanceAtom = atom<BigNumber>(BigNumber.from(0)); // from token allownace to router
export const toTokenBalanceAtom = atom<BigNumber>(BigNumber.from(0)); // to token balance of user
export const toTokenAllowanceAtom = atom<BigNumber>(BigNumber.from(0)); // to token allownace to router

export const lpBalanceAtom = atom<BigNumber>(BigNumber.from(0)); // LP token balance of user
export const lpAllowanceAtom = atom<BigNumber>(BigNumber.from(0)); // LP token allowance to router
export const stakingBalanceAtom = atom<BigNumber>(BigNumber.from(0)); // STK token balance of user
export const stakingAllowanceAtom = atom<BigNumber>(BigNumber.from(0)); // STK token allowance to router

// TOKEN ALLOWANCE

// CONTRACTS
export const fromTokenContractAtom = atom<null | ERC20>(null);
export const toTokenContractAtom = atom<null | ERC20>(null);
export const pairAtom = atom<null | Pair>(null);
export const stakingAtom = atom<null | Staking>(null);

// TOKEN DATA
interface Token {
  address: string;
  decimals: number;
  symbol: string;
}

export const fromTokenAtom: WritableAtom<Token | null, [Token], void> = atom<
  null | Token,
  [Token],
  void
>(
  null,
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  createTokenWrite(() => ({
    tokenAtom: fromTokenAtom,
    tokenContractAtom: fromTokenContractAtom,
    balanceAtom: fromTokenBalanceAtom,
    allowanceAtom: fromTokenAllowanceAtom,
  })),
);
export const toTokenAtom: WritableAtom<Token | null, [Token], void> = atom<
  null | Token,
  [Token],
  void
>(
  null,
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  createTokenWrite(() => ({
    tokenAtom: toTokenAtom,
    tokenContractAtom: toTokenContractAtom,
    balanceAtom: toTokenBalanceAtom,
    allowanceAtom: toTokenAllowanceAtom,
  })),
);

function createTokenWrite(
  f: () => {
    tokenAtom: WritableAtom<Token | null, [Token], void>;
    tokenContractAtom: typeof fromTokenContractAtom;
    balanceAtom: typeof fromTokenBalanceAtom;
    allowanceAtom: typeof fromTokenAllowanceAtom;
  },
) {
  return async (get: Getter, set: Setter, token: Token) => {
    const { tokenAtom, tokenContractAtom, balanceAtom, allowanceAtom } = f();
    set(tokenAtom, token);

    const isETH = token.address === ethers.constants.AddressZero;

    const signer = get(signerAtom)!;
    invariant(signer, 'signer must not be null');

    const router = get(routerAtom)!;

    // set token contract
    const tokenContract = isETH
      ? null
      : ERC20__factory.connect(token.address, signer);
    set(tokenContractAtom, tokenContract);

    // read balance
    const balance = isETH
      ? await signer.getBalance()
      : await tokenContract!.balanceOf(signer.getAddress());
    set(balanceAtom, balance);

    // read allowance to router
    const allowance = isETH
      ? ethers.constants.MaxUint256
      : await tokenContract!.allowance(signer.getAddress(), router.address);
    set(allowanceAtom, allowance);

    console.log('token updated:', {
      token,
      isETH,
      balance: formatUnits(balance, token.decimals),
      allowance: formatUnits(allowance, token.decimals),
    });

    // sleep 1 sec
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    const fromToken = get(fromTokenAtom);
    const toToken = get(toTokenAtom);

    // short circuit if one of token is not supplied
    if (!fromToken || !toToken) {
      console.log('A pair of tokens should be supplied');

      return;
    }

    const WETH = get(WETHAtom);

    // load pair and staking
    const factory = await get(factoryAtom);
    invariant(factory, 'factory should exist');
    const pairAddress = await factory.getPair(
      fromToken.address === ethers.constants.AddressZero
        ? WETH!.address
        : fromToken.address,
      toToken.address === ethers.constants.AddressZero
        ? WETH!.address
        : toToken.address,
    );

    // short circuit if pair doesn't exist
    if (pairAddress === ethers.constants.AddressZero) return;

    const pair = Pair__factory.connect(pairAddress, signer);
    set(pairAtom, pair);

    const stakingAddress = await factory.getStaking(
      fromToken.address === ethers.constants.AddressZero
        ? WETH!.address
        : fromToken.address,
      toToken.address === ethers.constants.AddressZero
        ? WETH!.address
        : toToken.address,
    );

    const staking = Staking__factory.connect(stakingAddress, signer);
    set(stakingAtom, staking);

    set(lpBalanceAtom, await pair.balanceOf(signer.getAddress()));
    set(
      lpAllowanceAtom,
      await pair.allowance(signer.getAddress(), router.address),
    );
    set(stakingBalanceAtom, await staking.balanceOf(signer.getAddress()));
    set(
      stakingAllowanceAtom,
      await staking.allowance(signer.getAddress(), router.address),
    );

    console.log('pair updated', {
      pair,
      staking,
      lpBalance: formatUnits(get(lpBalanceAtom), 18),
      lpAllowance: formatUnits(get(lpAllowanceAtom), 18),
      stakingBalance: formatUnits(get(stakingBalanceAtom), 18),
      stakingAllowance: formatUnits(get(stakingAllowanceAtom), 18),
    });
  };
}
