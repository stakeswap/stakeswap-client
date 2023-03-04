import { BigNumber, ethers } from 'ethers';
import { formatEther, formatUnits } from 'ethers/lib/utils';
import invariant from 'invariant';
import { atom, PrimitiveAtom } from 'jotai';
import { round } from 'lodash';

import DEPLOYMENT from '../contract-deployment.json';
import {
  BaseAdaptor__factory,
  Factory,
  Factory__factory,
  FraxAdaptor,
  LidoAdaptor,
  LSDAggregator,
  LSDAggregator__factory,
  RocketPoolAdaptor,
  Router,
  Router__factory,
  WETHInterface,
  WETHInterface__factory,
} from '../typechain';
// eslint-disable-next-line import/no-cycle
import { ETH, fromTokenAtom, TokenState, toTokenAtom, USDC } from './token';

console.log('DEPLOYMENT', DEPLOYMENT);

// NETWORK SPECIFIC
export const deploymentAtom = atom<null | typeof DEPLOYMENT.hardhat>(null);
export const chainIdAtom = atom<null | number>(null);
export const signerAtom = atom<null | ethers.providers.JsonRpcSigner>(null);
export const signerAddressAtom = atom<null | string>(null);

export const rewardAPRAtom = atom<number>(6.5);

export type SignerAtomType = PrimitiveAtom<TokenState | null>;

// COMMON CONTRACTS
export const factoryAtom = atom<null | Factory>(null);
export const aggregatorAtom = atom<null | LSDAggregator>(null);
export const routerAtom = atom<null | Router>(null);
export const WETHAtom = atom<null | WETHInterface>(null);

// PROVIDER: set other atoms when provider is set
export const providerAtom = atom<
  ethers.providers.Web3Provider | null,
  [ethers.providers.Web3Provider],
  void
>(null, async (get, set, provider) => {
  invariant(provider, 'provider must not be null');

  // init provider, signer, chainId, deployment
  set(providerAtom, provider);

  const signer = await provider.getSigner(0);
  set(signerAtom, signer);

  const signerAddress = await signer.getAddress();
  set(signerAddressAtom, signerAddress);

  const { chainId } = await provider.getNetwork();
  set(chainIdAtom, chainId);

  const deploymentTmp = Object.values(DEPLOYMENT).find(
    (d) => d.chainId === chainId,
  );

  invariant(deploymentTmp, 'Cannot find deployment with chainId: %s', chainId);
  set(deploymentAtom, deploymentTmp);
  const deployment = get(deploymentAtom)!;

  // set common contract instance
  const factory = Factory__factory.connect(
    deployment.contracts.Factory,
    signer,
  );
  set(factoryAtom, factory);
  const aggregator = LSDAggregator__factory.connect(
    deployment.contracts.LSDAggregator,
    signer,
  );
  set(aggregatorAtom, aggregator);
  const router = Router__factory.connect(deployment.contracts.Router, signer);
  set(routerAtom, router);

  const WETH = WETHInterface__factory.connect(await factory.WETH(), signer);
  set(WETHAtom, WETH);

  // // default token pair: ETH-USDC
  set(fromTokenAtom, ETH);
  set(toTokenAtom, USDC);

  const adaptors = await Promise.all([
    aggregator.adaptors(0).then((a) => BaseAdaptor__factory.connect(a, signer)),
    aggregator.adaptors(1).then((a) => BaseAdaptor__factory.connect(a, signer)),
    aggregator.adaptors(2).then((a) => BaseAdaptor__factory.connect(a, signer)),
  ]);
  const aprs = await Promise.all(adaptors.map((a) => a.getAPR()));

  const depositWeights = await Promise.all(
    adaptors.map((a) => aggregator.depositWeights(a.address)),
  );
  const buyWeights = await Promise.all(
    adaptors.map((a) => aggregator.buyWeights(a.address)),
  );
  const DENOMINATOR = BigNumber.from(10_000);
  const apr = aprs
    .reduce((acc, a, i) => {
      const dw = depositWeights[i];
      const bw = buyWeights[i];
      const w = dw.add(bw);
      return a.mul(w).div(DENOMINATOR).add(acc);
    })
    .mul(100);

  set(rewardAPRAtom, round(parseFloat(formatUnits(apr, 18)), 2));
});

export const priceETH = 1560;
export const priceUSDC = 0.98;
