/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-lone-blocks */
/* eslint-disable import/no-cycle */

import { BigNumber, ethers, Signature } from 'ethers';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import invariant from 'invariant';
import { atom, Getter, Setter, WritableAtom } from 'jotai';
import { Pair, Pair__factory, Staking, Staking__factory } from '../typechain';
import { IERC20 } from '../typechain/ERC20';
import { ERC20__factory } from '../typechain/factories/lib/openzeppelin-contracts/contracts/token/ERC20';
// eslint-disable-next-line import/no-cycle
import {
  factoryAtom,
  routerAtom,
  signerAddressAtom,
  signerAtom,
  WETHAtom,
} from './common';
import {
  generateSignature,
  getDeadline,
  isTokenSupportPermit,
} from './heleprs';

const DEFAULT_LOGO_URL =
  'https://tokens.1inch.io/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984.png';

// CONTRACTS
export const sortedAtom = atom<boolean>(false);
export const pairAtom = atom<null | Pair>(null);
export const stakingAtom = atom<null | Staking>(null);
export type TokenState = Token & {
  balance: BigNumber;
  isETH: boolean;
  approved: boolean;
  permitable: boolean;
  permitSignature?: Signature;
};

// TOKEN STATE
export const fromTokenStateAtom = atom<null | TokenState>(null);
export const toTokenStateAtom = atom<null | TokenState>(null);
export const lpTokenStateAtom = atom<null | TokenState>(null);
export const stakingTokenStateAtom = atom<null | TokenState>(null);

// TOKEN DATA
export interface Token {
  address: string;
  decimals: number;
  symbol: string;
  logoURI: string;
}

export const ETH = {
  symbol: 'ETH',
  name: 'Ethereum',
  decimals: 18,
  address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  logoURI:
    'https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png',
  tags: ['native', 'PEG:ETH'],
};
export const USDC = {
  symbol: 'USDC',
  name: 'USD Coin',
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  decimals: 6,
  logoURI:
    'https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png',
  eip2612: true,
  domainVersion: '2',
  tags: ['tokens', 'PEG:USD'],
};

export const fromTokenAtom: WritableAtom<Token, [Token], void> = atom<
  Token,
  [Token],
  void
>(
  ETH,
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  createTokenWrite(() => ({
    tokenAtom: fromTokenAtom,
    tokenStateAtom: fromTokenStateAtom,
  })),
);
export const toTokenAtom: WritableAtom<Token, [Token], void> = atom<
  Token,
  [Token],
  void
>(
  USDC,
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  createTokenWrite(() => ({
    tokenAtom: toTokenAtom,
    tokenStateAtom: toTokenStateAtom,
  })),
);

function sleep(sec: number): Promise<void> {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, sec * 1000));
}

function createTokenWrite(
  f: () => {
    tokenAtom: WritableAtom<Token | null, [Token], void>;
    tokenStateAtom: typeof fromTokenStateAtom;
  },
) {
  return async (get: Getter, set: Setter, token: Token) => {
    const { tokenAtom, tokenStateAtom } = f();
    const signer = get(signerAtom)!;
    invariant(signer, 'signer must not be null');

    set(tokenAtom, token);
    const isETH =
      token.address === ethers.constants.AddressZero ||
      token.address === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
    const router = get(routerAtom)!;

    // load token state
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const loadTokenBalance = async (isETH: boolean, tokenContract?: IERC20) => {
      const balance = isETH
        ? await signer.getBalance()
        : await tokenContract!.balanceOf(signer.getAddress());
      const allowance = isETH
        ? ethers.constants.MaxUint256
        : await tokenContract!.allowance(signer.getAddress(), router.address);
      const approved = allowance.gt(0);
      const permitable = await isTokenSupportPermit(signer, token.address);
      return { balance, approved, permitable };
    };

    const tokenState: TokenState = {
      ...token,
      isETH,
      ...(await loadTokenBalance(
        isETH,
        isETH ? undefined : ERC20__factory.connect(token.address, signer),
      )),
    };
    set(tokenStateAtom, tokenState);

    // if all token data is provided, fetch pair, staking state
    const fromTokenState = get(fromTokenStateAtom);
    const toTokenState = get(toTokenStateAtom);

    // short circuit if one of token is not supplied
    if (!fromTokenState || !toTokenState) {
      console.log('A pair of tokens should be supplied');
      return;
    }

    // load other contracts
    const WETH = get(WETHAtom)!;
    const factory = await get(factoryAtom)!;

    const tokenA = fromTokenState.isETH ? WETH.address : fromTokenState.address;
    const tokenB = toTokenState.isETH ? WETH.address : toTokenState.address;
    const sorted = isSorted(tokenA, tokenB);
    set(sortedAtom, sorted);

    const [token0State, token1State] = sortValueIfSorted(
      sorted,
      fromTokenState,
      toTokenState,
    );

    const pairAddress = await factory.getPair(tokenA, tokenB);

    // short circuit if pair doesn't exist
    if (pairAddress === ethers.constants.AddressZero) return;

    // set pair contract and LP token state
    const pair = Pair__factory.connect(pairAddress, signer);
    set(pairAtom, pair);
    set(lpTokenStateAtom, {
      address: pairAddress,
      decimals: 18,
      symbol: `LP-${fromTokenState.symbol}-${toTokenState.symbol}`,
      isETH: false,
      logoURI: DEFAULT_LOGO_URL,
      ...(await loadTokenBalance(false, pair)),
    });

    // set staking contract and STK token state
    const stakingAddress = await factory.getStaking(tokenA, tokenB);
    const staking = Staking__factory.connect(stakingAddress, signer);
    set(stakingAtom, staking);
    set(stakingTokenStateAtom, {
      address: stakingAddress,
      decimals: 18,
      symbol: `STK-${token0State.symbol}-${token1State.symbol}`,
      isETH: false,
      logoURI: DEFAULT_LOGO_URL,
      ...(await loadTokenBalance(false, staking)),
    });

    console.log('pair updated', {
      pair: pair.address,
      staking: staking.address,
      pairTotalSupply: formatUnits(await pair.totalSupply(), 18),
      stakingTotalSupply: formatUnits(await staking.totalSupply(), 18),
      lpTokenStateAtom: get(lpTokenStateAtom),
      stakingTokenStateAtom: get(stakingTokenStateAtom),
    });

    // TEST PURPOSE....
    // await runTestScenario(get, set);
  };
}

let isTestScenarioRunning = false;

async function runTestScenario(get: Getter, set: Setter) {
  if (isTestScenarioRunning) return;
  isTestScenarioRunning = true;
  // assume: fromToken = ETH, toToken = USDC (set defualt)
  const fromToken = get(fromTokenAtom);
  invariant(fromToken, 'fromToken is not initalized');
  const toToken = get(toTokenAtom);
  invariant(toToken, 'toToken is not initalized');

  invariant(fromToken.symbol === 'ETH', 'NOT ETH');
  invariant(toToken.symbol === 'USDC', 'NOT USDC');

  const fromTokenState = get(fromTokenStateAtom)!;
  const toTokenState = get(toTokenStateAtom)!;

  // load default contracts
  const router = get(routerAtom);
  invariant(router, 'router is not initalized');
  const signer = get(signerAtom);
  invariant(signer, 'signer is not initalized');
  const signerAddress = get(signerAddressAtom);
  invariant(signerAddress, 'signerAddress is not initalized');
  const WETH = get(WETHAtom);
  invariant(WETH, 'WETH is not initalized');

  const pair = get(pairAtom);
  invariant(pair, 'pair is not initalized');
  const staking = get(stakingAtom);
  invariant(staking, 'staking is not initalized');

  const sorted =
    (await pair.token0()).toLowerCase() ===
    (fromToken.address === ethers.constants.AddressZero
      ? WETH.address
      : fromToken.address
    ).toLowerCase();

  // 1. add liquidity
  {
    console.log('1. add liquidity');

    // 1.1 approve fromToken, toToken to router
    {
      if (!fromTokenState.isETH && !fromTokenState.approved) {
        console.log('1.1 approve from token');

        const tx = await ERC20__factory.connect(
          fromTokenState.address,
          signer,
        ).approve(router.address, ethers.constants.MaxUint256);
        await tx.wait(2);

        // update fromTokenState
        fromTokenState.approved = true;
        set(fromTokenStateAtom, fromTokenState);
      }

      if (!toTokenState.isETH && !toTokenState.approved) {
        console.log('1.1 approve to token');
        const tx = await ERC20__factory.connect(
          toTokenState.address,
          signer,
        ).approve(router.address, ethers.constants.MaxUint256);
        await tx.wait(2);

        // update fromTokenState
        toTokenState.approved = true;
        set(toTokenStateAtom, toTokenState);
      }
    }

    // 1.2 add liquidity
    {
      const [r0, r1] = await pair.getReserves();
      const [fromReserve, toReserve] = sortValueIfSorted(sorted, r0, r1);

      // assume: initial liquidity is 1 ETH + 1600 or extra USDC)
      const fromTokenAmount = parseUnits('1', fromToken.decimals);
      const toTokenAmount =
        fromReserve.eq(0) && toReserve.eq(0)
          ? parseUnits('1600', toToken.decimals)
          : await router.quote(fromTokenAmount, fromReserve, toReserve);

      console.log('fromReserve', formatUnits(fromReserve, fromToken.decimals));
      console.log('toReserve', formatUnits(toReserve, toToken.decimals));
      console.log(
        'fromTokenAmount',
        formatUnits(fromTokenAmount, fromToken.decimals),
      );
      console.log(
        'toTokenAmount',
        formatUnits(toTokenAmount, toToken.decimals),
      );

      console.log('1.2 add liquidity');

      // if fromToken is not ETH, use addLiquidity instead of addLiquidityETH
      const tx = await router
        .connect(signer)
        .addLiquidityETH(
          toToken.address,
          toTokenAmount,
          toTokenAmount.mul(97).div(100),
          fromTokenAmount.mul(97).div(100),
          signerAddress,
          await getDeadline(signer),
          { value: fromTokenAmount },
        );

      // wait 2 block and update state
      await tx.wait(2);
      set(toTokenAtom, toToken); // this invoke updating balance of tokens (from, to, lp, staking)
      await sleep(2); // wait 2 sec...
    }
  }

  // 2. stake LP totken
  {
    console.log('2. stake LP');
    {
      // assume user stake all LP token
      const lpTokenState = get(lpTokenStateAtom)!;

      // 2.1 generate signature
      if (!lpTokenState.approved && !lpTokenState.permitSignature) {
        console.log('2.1 generate signature');
        lpTokenState.permitSignature = await generateSignature(
          signer,
          router.address,
          lpTokenState.address,
        );
        set(lpTokenStateAtom, lpTokenState);
      }

      // 2.2 stake all LP token
      console.log('2.2 stake all LP token');
      const tokenA =
        fromToken.address === ethers.constants.AddressZero
          ? WETH.address
          : fromToken.address;
      const tokenB =
        toToken.address === ethers.constants.AddressZero
          ? WETH.address
          : toToken.address;

      const tx = lpTokenState.permitSignature
        ? await router.stakeWithPermit(
            tokenA,
            tokenB,
            lpTokenState.balance,
            await getDeadline(signer),
            true,
            lpTokenState.permitSignature.v,
            lpTokenState.permitSignature.r,
            lpTokenState.permitSignature.s,
          )
        : await router.stake(
            tokenA,
            tokenB,
            lpTokenState.balance,
            await getDeadline(signer),
          );

      await tx.wait(2);

      lpTokenState.approved = true;
      delete lpTokenState.permitSignature;
      set(lpTokenStateAtom, lpTokenState);
    }
  }

  // 3. swap USDC -> ETH
  {
    console.log('3. swap USDC -> ETH');
  }

  // 4. unstake
  // should the price manipulated...!
  {
    console.log('4. unstake');
  }

  // 5. remove liquidity
  {
    console.log('5. remove liquidity');
  }

  // await generatePermitSignatureOrApprove(
  //   get,
  //   set,
  //   stakingAtom,
  //   stakingAllowanceAtom,
  //   stakingPermitSignatureAtom,
  // );
}

export function sortValueIfSorted<T>(
  sorted: boolean,
  valueA: T,
  valueB: T,
): [T, T] {
  if (sorted) return [valueA, valueB];
  return [valueB, valueA];
}

export function isSorted(token0: string, token1: string) {
  return token0.toLowerCase() < token1.toLowerCase();
}

export function sortValue<T>(
  token0: string,
  token1: string,
  valueA: T,
  valueB: T,
): [T, T] {
  return sortValueIfSorted(isSorted(token0, token1), valueA, valueB);
}
