/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useState } from 'react';
import { debounce, Typography } from '@mui/material';
import { useAtom } from 'jotai';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import { ContractTransaction, ethers } from 'ethers';
import { secondary } from '../../components/util/colors';
import TokenSearchModal from '../../components/TokenSearchModal';
import {
  PrimaryContainedButton,
  TokenSearchButton,
} from '../../components/util/button';
import {
  fromTokenAtom,
  fromTokenStateAtom,
  getDeadline,
  isETH,
  isWETH,
  lpTokenStateAtom,
  pairAtom,
  pairStateAtom,
  routerAtom,
  signerAddressAtom,
  signerAtom,
  sortedAtom,
  sortValueIfSorted,
  stakingTokenStateAtom,
  toTokenAtom,
  toTokenStateAtom,
  WETHAtom,
} from '../../contracts';
import { ERC20__factory } from '../../typechain';

function Swap() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [toToken, setToToken] = useAtom(toTokenAtom);
  const [signer] = useAtom(signerAtom);
  const [signerAddress] = useAtom(signerAddressAtom);
  const [fromTokenState] = useAtom(fromTokenStateAtom);
  const [toTokenState] = useAtom(toTokenStateAtom);

  const [WETH] = useAtom(WETHAtom);
  const [router] = useAtom(routerAtom);
  const [pair] = useAtom(pairAtom);
  const [pairState] = useAtom(pairStateAtom);

  const connected =
    signer &&
    signerAddress &&
    fromTokenState &&
    toTokenState &&
    router &&
    pair &&
    pairState &&
    WETH;

  const [fromTokenAmountInput, setFromTokenAmountInput] = useState('0');
  const [toTokenAmountInput, setToTokenAmountInput] = useState('0');

  const fromTokenAmountBN = parseUnits(
    fromTokenAmountInput,
    fromTokenState?.decimals,
  );

  // check isInsufficient
  useEffect(() => {
    if (!connected) return;

    (async () => {
      const fromTokenAmountInputBN = parseUnits(
        fromTokenAmountInput,
        fromTokenState.decimals,
      );
      const sorted = fromTokenState.isETH && isWETH(pairState.token0);
      const { r0, r1 } = pairState;
      const [fromTokenReserve, toTokenReserve] = await sortValueIfSorted(
        sorted,
        r0,
        r1,
      );

      const toTokenAmountBN = await router.getAmountOut(
        fromTokenAmountInputBN,
        fromTokenReserve,
        toTokenReserve,
      );
      const toTokenAmount = formatUnits(toTokenAmountBN, toTokenState.decimals);
      console.log('quote updated: %s', toTokenAmount);

      setToTokenAmountInput(toTokenAmount);
    })().catch(console.error);
  }, [
    connected,
    fromTokenAmountInput,
    fromTokenState,
    pair,
    pairState,
    router,
    setToTokenAmountInput,
    toTokenState,
    toTokenAmountInput,
    fromTokenAmountBN,
  ]);

  const swap = async () => {
    if (!connected) return;

    const [r0, r1] = await pair!.getReserves();

    // check allowance
    if (!fromTokenState!.isETH && !fromTokenState!.approved) {
      console.log('approve From token: %s', fromTokenState?.symbol);

      await ERC20__factory.connect(fromTokenState!.address, signer!).approve(
        router!.address,
        ethers.constants.MaxUint256,
      );
    }

    const fromTokenAmount = parseUnits(
      fromTokenAmountInput,
      fromTokenState!.decimals,
    );
    const toTokenAmount = parseUnits(
      toTokenAmountInput,
      toTokenState!.decimals,
    );
    console.log(
      '%s %s -> %s %s',
      fromTokenAmountInput,
      fromTokenState.symbol,
      toTokenAmountInput,
      toTokenState.symbol,
    );

    let tx: ContractTransaction;

    if (fromTokenState.isETH) {
      tx = await router.swapExactETHForTokens(
        toTokenAmount.mul(97).div(100),
        [WETH.address, toToken.address],
        signerAddress,
        getDeadline(signer),
        { value: fromTokenAmount },
      );
    } else {
      tx = await router.swapExactTokensForETH(
        fromTokenAmount,
        toTokenAmount.mul(97).div(100),
        [fromTokenState.address, WETH.address],
        signerAddress,
        getDeadline(signer),
      );
    }

    await tx.wait(2);
    setToToken(toToken); // update all state
  };

  return (
    <div
      style={{
        marginTop: '160px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '415px',
          height: '388px',
          padding: '16px',
          borderRadius: '20px',
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        }}
      >
        <Typography
          style={{
            margin: '0 0 18px 10px',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          Swap
        </Typography>
        <div
          style={{
            width: '100%',
            height: '96px',
            padding: '24px 16px 12px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: secondary,
            borderRadius: '16px',
            boxSizing: 'border-box',
          }}
        >
          <input
            disabled={!connected}
            inputMode="numeric"
            pattern="[-+]?[0-9]*[.,]?[0-9]+"
            value={fromTokenAmountInput}
            onChange={(e) => setFromTokenAmountInput(e.target.value)}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'end',
            }}
          >
            <TokenSearchButton
              tokenAtom={fromTokenAtom}
              backgroundColor="white"
              onClick={handleOpen}
            />
            <TokenSearchModal open={open} handleClose={handleClose} />
            <Typography
              style={{ marginTop: '8px', fontSize: '12px', color: '#A5A5A5' }}
            >
              Balance:{' '}
              {fromTokenState
                ? formatUnits(fromTokenState.balance, fromTokenState.decimals)
                : '0'}
            </Typography>
          </div>
        </div>
        <div
          style={{
            width: '100%',
            height: '96px',
            marginTop: '4px',
            padding: '24px 16px 12px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: secondary,
            borderRadius: '16px',
            boxSizing: 'border-box',
          }}
        >
          <input
            disabled
            inputMode="numeric"
            pattern="[-+]?[0-9]*[.,]?[0-9]+"
            value={toTokenAmountInput}
            onChange={(e) => setToTokenAmountInput(e.target.value)}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'end',
            }}
          >
            <TokenSearchButton
              tokenAtom={toTokenAtom}
              backgroundColor="white"
              onClick={handleOpen}
            />
            <TokenSearchModal open={open} handleClose={handleClose} />
            <Typography
              style={{ marginTop: '8px', fontSize: '12px', color: '#A5A5A5' }}
            >
              Balance:{' '}
              {toTokenState
                ? formatUnits(toTokenState.balance, toTokenState.decimals)
                : '0'}
            </Typography>
          </div>
        </div>
        <div style={{ marginTop: '65px' }}>
          <PrimaryContainedButton
            width="100%"
            height="60px"
            fontSize="20px"
            text={fromTokenAmountBN.eq(0) ? 'Enter an amount' : 'Swap'}
            borderRadius="16px"
            onClick={swap}
          />
        </div>
      </div>
    </div>
  );
}

export default Swap;
