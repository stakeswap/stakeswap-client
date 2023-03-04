/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-lone-blocks */
/* eslint-disable import/no-cycle */

import { BigNumber, ethers, Signature } from 'ethers';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import invariant from 'invariant';
import { atom, Getter, PrimitiveAtom, Setter, WritableAtom } from 'jotai';
import {
  LP__factory,
  Pair,
  Pair__factory,
  Staking,
  Staking__factory,
} from '../typechain';
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
export const sortedAtom = atom<null | boolean>(null);
export const pairAtom = atom<null | Pair>(null);
export const stakingAtom = atom<null | Staking>(null);
export type TokenState = Token & {
  balance: BigNumber;
  isETH: boolean;
  approved: boolean;
  permitable: boolean;
  isLP?: boolean;
  isSTK?: boolean;
};

// PERMIT SIGNATURE FOR LP AND STK
export type PermitMapType = {
  [token: string]: {
    [nonce: string]: Signature;
  };
};
export const permitMapAtom = atom<PermitMapType>({});

export function getPermitNonce(
  signer: ethers.providers.JsonRpcSigner,
  token: string,
) {
  return LP__factory.connect(token, signer)
    .nonces(signer.getAddress())
    .then((n) => n.toHexString());
}

// PAIR STATE
export const pairStateAtom = atom<null | {
  token0: string;
  token1: string;
  r0: BigNumber;
  r1: BigNumber;
  ethReserve: BigNumber;
  tokenReserve: BigNumber;
  totalSupply: BigNumber;
  stakedWETHAmount: BigNumber;
}>(null);

// STAKING STATE
type StakingStateType = {
  lpBalance: BigNumber; // LP that Staking holds
  totalSupply: BigNumber; // total supply of STK
  stakedETH: BigNumber; // amount of ETH staked for STK
};
export const stakingStateAtom = atom<
  null | StakingStateType,
  [StakingStateType],
  void
>(null, async (get, set, stakingState) => {
  set(stakingStateAtom, stakingState);
  console.log('updating stakingStateAtom...');

  // load unstaking data
  const signer = get(signerAtom);
  const router = get(routerAtom);
  const fromTokenState = get(fromTokenStateAtom);
  const toTokenState = get(toTokenStateAtom);
  const stakingTokenState = get(stakingTokenStateAtom);
  const WETH = get(WETHAtom);
  const permitMap = get(permitMapAtom);

  if (
    !signer ||
    !router ||
    !fromTokenState ||
    !toTokenState ||
    !WETH ||
    !stakingTokenState
  ) {
    console.log('not specified...');
    return;
  }

  const nonce = await getPermitNonce(signer, stakingTokenState.address);

  const stakingPermitSig = (permitMap[stakingTokenState.address] ?? [])[nonce];

  if (!stakingTokenState.approved && !stakingPermitSig) {
    console.log('no approval data...');
    return;
  }

  const unstakingData = stakingTokenState.balance.eq(0)
    ? undefined
    : stakingTokenState.approved
    ? await router.callStatic
        .unstake(
          fromTokenState.isETH ? WETH.address : fromTokenState.address,
          toTokenState.isETH ? WETH.address : toTokenState.address,
          stakingTokenState.balance,
          getDeadline(signer),
        )
        .catch((err) => {
          console.error('Failed to call unstake', err);
          return undefined;
        })
    : stakingPermitSig
    ? await router.callStatic
        .unstakeWithPermit(
          fromTokenState.isETH ? WETH.address : fromTokenState.address,
          toTokenState.isETH ? WETH.address : toTokenState.address,
          stakingTokenState.balance,
          getDeadline(signer),
          true,
          stakingPermitSig.v,
          stakingPermitSig.r,
          stakingPermitSig.s,
        )
        .catch((err) => {
          console.error('Failed to call unstakeWithPermit', err);
          return undefined;
        })
    : undefined;

  if (!unstakingData) return;

  set(unstakingDataAtom, unstakingData);
});

export const unstakingDataAtom = atom<null | {
  lp: BigNumber; // amount of LP token that staker will receive after unstake
  ethAmount: BigNumber; // total amount of ETH redeemd (Note that ethAmount = poolETHAmount + rewardToStaker)
  poolETHAmount: BigNumber; // amount of ETH that pool receives
  rewardToStaker: BigNumber; // amount of ETH that staker receives
}>(null);

// TOKEN STATE
export const fromTokenStateAtom = atom<null | TokenState>(null);
export const toTokenStateAtom = atom<null | TokenState>(null);
export const lpTokenStateAtom = atom<null | TokenState>(null);
export const stakingTokenStateAtom = atom<null | TokenState>(null);

export type TokenStateAtomType = PrimitiveAtom<TokenState | null>;

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

export function sleep(sec: number): Promise<void> {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, sec * 1000));
}
export async function sleepWhile(cond: () => boolean, sec: number) {
  // eslint-disable-next-line no-await-in-loop
  while (cond()) await sleep(sec);
}

function createTokenWrite(
  f: () => {
    tokenAtom: WritableAtom<Token | null, [Token], void>;
    tokenStateAtom: typeof fromTokenStateAtom;
  },
) {
  return async (get: Getter, set: Setter, token: Token) => {
    // remove unstaking data. it will be filled when stakingState is loaded
    set(unstakingDataAtom, null);

    const { tokenAtom, tokenStateAtom } = f();
    const signer = get(signerAtom)!;
    invariant(signer, 'signer must not be null');

    set(tokenAtom, token);
    const _isETH =
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
      isETH: _isETH,
      ...(await loadTokenBalance(
        _isETH,
        _isETH ? undefined : ERC20__factory.connect(token.address, signer),
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

    const pairAddress = await factory.getPair(
      fromTokenState.isETH ? WETH.address : fromTokenState.address,
      toTokenState.isETH ? WETH.address : toTokenState.address,
    );
    // short circuit if pair doesn't exist
    if (pairAddress === ethers.constants.AddressZero) return;
    const pair = Pair__factory.connect(pairAddress, signer);
    set(pairAtom, pair);

    const tokenA = fromTokenState.isETH ? WETH.address : fromTokenState.address;
    const tokenB = toTokenState.isETH ? WETH.address : toTokenState.address;
    const sorted =
      (await pair.token0()).toLowerCase() ===
      (fromTokenState.isETH
        ? WETH.address
        : fromTokenState.address
      ).toLowerCase();
    set(sortedAtom, sorted);

    const [token0State, token1State] = sortValueIfSorted(
      sorted,
      fromTokenState,
      toTokenState,
    );

    // set pair contract and LP token state
    set(lpTokenStateAtom, {
      address: pairAddress,
      decimals: 18,
      symbol: `LP-${fromTokenState.symbol}-${toTokenState.symbol}`,
      isETH: false,
      logoURI: DEFAULT_LOGO_URL,
      isLP: true,
      ...(await loadTokenBalance(false, pair)),
    });

    const [r0, r1] = await pair.getReserves();
    const token0 = await pair.token0();
    const [ethReserve, tokenReserve] = sortValueIfSorted(
      token0.toLowerCase() === WETH.address.toLowerCase(),
      r0,
      r1,
    );
    const pairState = {
      ethReserve,
      tokenReserve,
      token0: await pair.token0(),
      token1: await pair.token1(),
      r0,
      r1,
      totalSupply: await pair.totalSupply(),
      stakedWETHAmount: await pair.stakedWETHAmount(),
    };
    set(pairStateAtom, pairState);

    // set staking contract and STK token state
    const stakingAddress = await factory.getStaking(tokenA, tokenB);
    const staking = Staking__factory.connect(stakingAddress, signer);
    set(stakingAtom, staking);
    const stakingTokenState = {
      address: stakingAddress,
      decimals: 18,
      symbol: `STK-${token0State.symbol}-${token1State.symbol}`,
      isETH: false,
      logoURI: DEFAULT_LOGO_URL,
      isSTK: true,
      ...(await loadTokenBalance(false, staking)),
    };
    set(stakingTokenStateAtom, stakingTokenState);
    set(stakingStateAtom, {
      lpBalance: await pair.balanceOf(staking.address),
      totalSupply: await staking.totalSupply(),
      stakedETH: await staking.stakedETH(),
    });

    console.log('pair updated', {
      pair: pair.address,
      staking: staking.address,
      pairTotalSupply: formatUnits(await pair.totalSupply(), 18),
      ethReserve: formatUnits(pairState.ethReserve, 18),
      tokenReserve: formatUnits(pairState.tokenReserve, 18),
      stakingTotalSupply: formatUnits(await staking.totalSupply(), 18),
      lpTokenStateAtom: get(lpTokenStateAtom),
      stakingTokenStateAtom: get(stakingTokenStateAtom),
    });

    // TEST PURPOSE....
    // await runTestScenario(get, set);
  };
}

const isTestScenarioRunning = false;

// async function runTestScenario(get: Getter, set: Setter) {
//   if (isTestScenarioRunning) return;
//   isTestScenarioRunning = true;
//   // assume: fromToken = ETH, toToken = USDC (set defualt)
//   const fromToken = get(fromTokenAtom);
//   invariant(fromToken, 'fromToken is not initalized');
//   const toToken = get(toTokenAtom);
//   invariant(toToken, 'toToken is not initalized');

//   invariant(fromToken.symbol === 'ETH', 'NOT ETH');
//   invariant(toToken.symbol === 'USDC', 'NOT USDC');

//   const fromTokenState = get(fromTokenStateAtom)!;
//   const toTokenState = get(toTokenStateAtom)!;

//   // load default contracts
//   const router = get(routerAtom);
//   invariant(router, 'router is not initalized');
//   const signer = get(signerAtom);
//   invariant(signer, 'signer is not initalized');
//   const signerAddress = get(signerAddressAtom);
//   invariant(signerAddress, 'signerAddress is not initalized');
//   const WETH = get(WETHAtom);
//   invariant(WETH, 'WETH is not initalized');

//   const pair = get(pairAtom);
//   invariant(pair, 'pair is not initalized');
//   const staking = get(stakingAtom);
//   invariant(staking, 'staking is not initalized');

//   const sorted =
//     (await pair.token0()).toLowerCase() ===
//     (fromToken.address === ethers.constants.AddressZero
//       ? WETH.address
//       : fromToken.address
//     ).toLowerCase();

//   // 1. add liquidity
//   {
//     console.log('1. add liquidity');

//     // 1.1 approve fromToken, toToken to router
//     {
//       if (!fromTokenState.isETH && !fromTokenState.approved) {
//         console.log('1.1 approve from token');

//         const tx = await ERC20__factory.connect(
//           fromTokenState.address,
//           signer,
//         ).approve(router.address, ethers.constants.MaxUint256);
//         await tx.wait(2);

//         // update fromTokenState
//         fromTokenState.approved = true;
//         set(fromTokenStateAtom, fromTokenState);
//       }

//       if (!toTokenState.isETH && !toTokenState.approved) {
//         console.log('1.1 approve to token');
//         const tx = await ERC20__factory.connect(
//           toTokenState.address,
//           signer,
//         ).approve(router.address, ethers.constants.MaxUint256);
//         await tx.wait(2);

//         // update fromTokenState
//         toTokenState.approved = true;
//         set(toTokenStateAtom, toTokenState);
//       }
//     }

//     // 1.2 add liquidity
//     {
//       const [r0, r1] = await pair.getReserves();
//       const [fromReserve, toReserve] = sortValueIfSorted(sorted, r0, r1);

//       // assume: initial liquidity is 1 ETH + 1600 or extra USDC)
//       const fromTokenAmount = parseUnits('1', fromToken.decimals);
//       const toTokenAmount =
//         fromReserve.eq(0) && toReserve.eq(0)
//           ? parseUnits('1600', toToken.decimals)
//           : await router.quote(fromTokenAmount, fromReserve, toReserve);

//       console.log('fromReserve', formatUnits(fromReserve, fromToken.decimals));
//       console.log('toReserve', formatUnits(toReserve, toToken.decimals));
//       console.log(
//         'fromTokenAmount',
//         formatUnits(fromTokenAmount, fromToken.decimals),
//       );
//       console.log(
//         'toTokenAmount',
//         formatUnits(toTokenAmount, toToken.decimals),
//       );

//       console.log('1.2 add liquidity');

//       // if fromToken is not ETH, use addLiquidity instead of addLiquidityETH
//       const tx = await router
//         .connect(signer)
//         .addLiquidityETH(
//           toToken.address,
//           toTokenAmount,
//           toTokenAmount.mul(97).div(100),
//           fromTokenAmount.mul(97).div(100),
//           signerAddress,
//           await getDeadline(signer),
//           { value: fromTokenAmount },
//         );

//       // wait 2 block and update state
//       await tx.wait(2);
//       set(toTokenAtom, toToken); // this invoke updating balance of tokens (from, to, lp, staking)
//       await sleep(2); // wait 2 sec...
//       console.log('LIQUIDITY ADDED');
//     }
//   }

//   // 2. stake LP totken
//   {
//     console.log('2. stake LP');
//     {
//       // assume user stake all LP token
//       const lpTokenState = get(lpTokenStateAtom)!;
//       let permitMap = get(permitMapAtom)!;

//       // 2.1 generate signature
//       if (!lpTokenState.approved && !lpPermitSig) {
//         console.log('2.1 generate signature');
//         lpPermitSig = await generateSignature(
//           signer,
//           router.address,
//           lpTokenState.address,
//         );
//         set(lpTokenStateAtom, lpTokenState);
//       }

//       // 2.2 stake all LP token
//       console.log('2.2 stake all LP token');
//       const tokenA =
//         fromToken.address === ethers.constants.AddressZero
//           ? WETH.address
//           : fromToken.address;
//       const tokenB =
//         toToken.address === ethers.constants.AddressZero
//           ? WETH.address
//           : toToken.address;

//       const tx = lpPermitSig
//         ? await router.stakeWithPermit(
//             tokenA,
//             tokenB,
//             lpTokenState.balance,
//             await getDeadline(signer),
//             true,
//             lpPermitSig.v,
//             lpPermitSig.r,
//             lpPermitSig.s,
//           )
//         : await router.stake(
//             tokenA,
//             tokenB,
//             lpTokenState.balance,
//             await getDeadline(signer),
//           );

//       await tx.wait(2);

//       lpTokenState.approved = true;
//       // set(lpPermitSigAtom, null);
//       // set(lpTokenStateAtom, lpTokenState);
//     }
//   }

//   // 3. swap USDC -> ETH
//   {
//     console.log('3. swap USDC -> ETH');
//   }

//   // 4. unstake
//   // should the price manipulated...!
//   {
//     console.log('4. unstake');
//   }

//   // 5. remove liquidity
//   {
//     console.log('5. remove liquidity');
//   }

//   // await generatePermitSignatureOrApprove(
//   //   get,
//   //   set,
//   //   stakingAtom,
//   //   stakingAllowanceAtom,
//   //   stakingPermitSignatureAtom,
//   // );
// }

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

export function isETH(token: string) {
  return (
    token.toLowerCase() === ethers.constants.AddressZero ||
    token.toLowerCase() === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
  );
}

export function isWETH(token: string) {
  return token.toLowerCase() === '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
}

export const WETH_ADDRESS = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
