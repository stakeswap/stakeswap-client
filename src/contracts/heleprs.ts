/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-lone-blocks */
/* eslint-disable import/no-cycle */

// A helpers to send transaction

import { BigNumber, ethers, Signature } from 'ethers';
import invariant from 'invariant';
import { LP__factory, Router } from '../typechain';
import { sleepWhile } from './token';

const PERMIT_TYPE = [
  { name: 'owner', type: 'address' },
  { name: 'spender', type: 'address' },
  { name: 'value', type: 'uint256' },
  { name: 'nonce', type: 'uint256' },
  { name: 'deadline', type: 'uint256' },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function generateSignature(
  signer: ethers.providers.JsonRpcSigner,
  spender: string,
  tokenAddress: string,
): Promise<string> {
  const { chainId } = await signer.provider.getNetwork();

  const tokenContract = LP__factory.connect(tokenAddress, signer);
  const nonce = (await tokenContract.nonces(signer.getAddress())).toString();

  const params: Parameters<typeof signer._signTypedData> = [
    {
      name: await tokenContract.name(),
      version: '1',
      chainId,
      verifyingContract: tokenContract.address,
    },
    {
      Permit: PERMIT_TYPE,
    },
    {
      owner: await signer.getAddress(),
      spender,
      value: ethers.constants.MaxUint256,
      nonce,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      deadline: await getDeadline(signer),
    },
  ];

  // eslint-disable-next-line no-underscore-dangle
  const signature = await signer._signTypedData(...params);
  console.log('signature loaded: token=%s nonce=%s', tokenAddress, nonce);

  return signature;
}

export function splitSignature(signature: string): [number, string, string] {
  const s = ethers.utils.splitSignature(signature);
  return [s.v, s.r, s.s];
}

export async function getDeadline(
  signer: ethers.providers.JsonRpcSigner,
  offsetSec = 60 * 60, // 1H
): Promise<number> {
  invariant(signer, 'signor is not initialized');
  const latestBlock = await signer.provider.getBlock('latest');
  return latestBlock.timestamp + offsetSec;
}

export async function isTokenSupportPermit(
  signer: ethers.providers.JsonRpcSigner,
  tokenAddress: string,
) {
  if (tokenAddress === ethers.constants.AddressZero) return false;

  const tokenContract = LP__factory.connect(tokenAddress, signer);
  const permitable = await tokenContract
    .PERMIT_TYPEHASH()
    .then(
      (res) =>
        res ===
        '0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9',
    )
    .catch(() => false);

  return permitable;
}

export async function getOptimalAmountsToAddLiquidity(
  router: Router,
  reserveA: BigNumber,
  reserveB: BigNumber,
  amountADesired: BigNumber,
  amountBDesired: BigNumber,
): Promise<{
  amountAOptimal: BigNumber;
  amountBOptimal: BigNumber;
}> {
  if (reserveA.eq(0) && reserveB.eq(0)) {
    return {
      amountAOptimal: amountADesired,
      amountBOptimal: amountBDesired,
    };
  }

  const amountBOptimal = await router.quote(amountADesired, reserveA, reserveB);

  if (amountBOptimal.lte(amountBDesired)) {
    return {
      amountAOptimal: amountADesired,
      amountBOptimal,
    };
  }

  const amountAOptimal = await router.quote(amountBDesired, reserveB, reserveA);
  invariant(amountAOptimal.lte(amountADesired), 'INSUFFICIENT');
  return {
    amountAOptimal,
    amountBOptimal: amountBDesired,
  };
}
