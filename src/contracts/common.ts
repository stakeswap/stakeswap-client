import { ethers } from 'ethers';
import invariant from 'invariant';
import { atom, PrimitiveAtom } from 'jotai';

import DEPLOYMENT from '../contract-deployment.json';
import {
  Factory,
  Factory__factory,
  LSDAggregator,
  LSDAggregator__factory,
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
});
