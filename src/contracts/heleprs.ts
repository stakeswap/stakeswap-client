/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-lone-blocks */
/* eslint-disable import/no-cycle */

// A helpers to send transaction

import { ethers, Signature } from 'ethers';
import invariant from 'invariant';
import { LP__factory } from '../typechain';

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
): Promise<Signature> {
  const { chainId } = await signer.provider.getNetwork();

  const tokenContract = LP__factory.connect(tokenAddress, signer);

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
      nonce: await tokenContract.nonces(signer.getAddress()),
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      deadline: await getDeadline(signer),
    },
  ];

  // eslint-disable-next-line no-underscore-dangle
  const signature = await signer._signTypedData(...params);
  return ethers.utils.splitSignature(signature);
}

export async function getDeadline(
  signer: ethers.providers.JsonRpcSigner,
  offsetSec = 60 * 4, // 4 min
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
