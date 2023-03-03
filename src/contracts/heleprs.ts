// A helpers to send transaction

import { ethers } from 'ethers';
import invariant from 'invariant';
import { useAtomValue } from 'jotai';
import { routerAtom, signerAddressAtom, signerAtom } from './common';
import {
  fromTokenAllowanceAtom,
  fromTokenContractAtom,
  lpAllowanceAtom,
  pairAtom,
  stakingAllowanceAtom,
  stakingAtom,
} from './token';

// eslint-disable-next-line @typescript-eslint/naming-convention
export async function sendTx__approveFromToken() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const signer = useAtomValue(signerAtom);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const signerAddress = useAtomValue(signerAddressAtom);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const fromTokenAllowance = useAtomValue(fromTokenAllowanceAtom);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const fromTokenContract = useAtomValue(fromTokenContractAtom);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useAtomValue(routerAtom);

  invariant(signer, 'signer is not initialized');
  invariant(signerAddress, 'signerAddress is not initialized');
  invariant(fromTokenAllowance, 'fromTokenAllowance is not initialized');
  invariant(fromTokenContract, 'fromTokenContract is not initialized');
  invariant(router, 'router is not initialized');

  // short circuit if already approved
  if (fromTokenAllowance.eq(0)) return;

  // approve token
  await fromTokenContract
    .connect(signer)
    .approve(router.address, ethers.constants.MaxUint256);
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export async function sendTx__approveLP() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const signer = useAtomValue(signerAtom);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const signerAddress = useAtomValue(signerAddressAtom);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const lpAllowance = useAtomValue(lpAllowanceAtom);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const pair = useAtomValue(pairAtom);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useAtomValue(routerAtom);

  invariant(signer, 'signer is not initialized');
  invariant(signerAddress, 'signerAddress is not initialized');
  invariant(lpAllowance, 'lpAllowance is not initialized');
  invariant(pair, 'pair is not initialized');
  invariant(router, 'router is not initialized');

  // approve token
  await pair
    .connect(signer)
    .approve(router.address, ethers.constants.MaxUint256);
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export async function sendTx__approveSTK() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const signer = useAtomValue(signerAtom);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const signerAddress = useAtomValue(signerAddressAtom);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const stakingAllowance = useAtomValue(stakingAllowanceAtom);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const staking = useAtomValue(stakingAtom);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useAtomValue(routerAtom);

  invariant(signer, 'signer is not initialized');
  invariant(signerAddress, 'signerAddress is not initialized');
  invariant(stakingAllowance, 'stakingAllowance is not initialized');
  invariant(staking, 'staking is not initialized');
  invariant(router, 'router is not initialized');

  // approve token
  await staking
    .connect(signer)
    .approve(router.address, ethers.constants.MaxUint256);
}
