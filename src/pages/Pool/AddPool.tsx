/* eslint-disable @typescript-eslint/naming-convention */
import { debounce, FormControlLabel, Switch, Typography } from '@mui/material';
import { BigNumber, ethers } from 'ethers';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import { useAtom } from 'jotai';
import { throttle } from 'lodash';
import React, { useState } from 'react';
import TokenSearchModal from '../../components/TokenSearchModal';
import {
  PrimaryContainedButton,
  TokenSearchButton,
} from '../../components/util/button';
import { primary, secondary } from '../../components/util/colors';
import {
  fromTokenAtom,
  fromTokenStateAtom,
  getDeadline,
  lpTokenStateAtom,
  pairAtom,
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

export default function AddPool() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [toToken, setToToken] = useAtom(toTokenAtom);
  const [signer] = useAtom(signerAtom);
  const [signerAddress] = useAtom(signerAddressAtom);
  const [fromTokenState] = useAtom(fromTokenStateAtom);
  const [toTokenState] = useAtom(toTokenStateAtom);
  const [lpTokenState] = useAtom(lpTokenStateAtom);
  const [stakingTokenState] = useAtom(stakingTokenStateAtom);

  const [WETH] = useAtom(WETHAtom);
  const [router] = useAtom(routerAtom);
  const [pair] = useAtom(pairAtom);
  const [sorted] = useAtom(sortedAtom);

  const connected = router && pair;

  const [fromTokenAmountInput, _setFromTokenAmountInput] = useState('0');
  const [toTokenAmountInput, _setToTokenAmountInput] = useState('0');

  const checkAndSetInput = debounce(
    async (value: string, isFromTokenSet: boolean) => {
      let fromTokenAmount = isFromTokenSet ? value : fromTokenAmountInput;
      let toTokenAmount = isFromTokenSet ? toTokenAmountInput : value;

      const [r0, r1] = await pair!.getReserves();
      const [fromTokenReserve, toTokenReserve] = await sortValueIfSorted(
        sorted,
        r0,
        r1,
      );

      if (fromTokenReserve.eq(0) && toTokenReserve.eq(0)) {
        return;
      }

      if (isFromTokenSet) {
        const maxToTokenAmount = await router!.quote(
          parseUnits(fromTokenAmount.toString(), fromTokenState!.decimals),
          fromTokenReserve,
          toTokenReserve,
        );

        if (
          parseUnits(toTokenAmount.toString(), toTokenState!.decimals).gt(
            maxToTokenAmount,
          )
        ) {
          toTokenAmount = formatUnits(maxToTokenAmount, toTokenState!.decimals);
        }
      } else {
        const maxFromTokenAmount = await router!.quote(
          parseUnits(toTokenAmount.toString(), toTokenState!.decimals),
          toTokenReserve,
          fromTokenReserve,
        );

        if (
          parseUnits(fromTokenAmount.toString(), fromTokenState!.decimals).gt(
            maxFromTokenAmount,
          )
        ) {
          fromTokenAmount = formatUnits(
            maxFromTokenAmount,
            fromTokenState!.decimals,
          );
        }
      }

      if (isFromTokenSet) _setToTokenAmountInput(toTokenAmount);
      else _setFromTokenAmountInput(fromTokenAmount);
    },
    1000,
  );

  const setFromTokenAmountInput = (v: string) => {
    _setFromTokenAmountInput(v);
    checkAndSetInput(v, true);
  };
  const setToTokenAmountInput = (v: string) => {
    _setToTokenAmountInput(v);
    checkAndSetInput(v, false);
  };

  const addLiquidity = async () => {
    const [r0, r1] = await pair!.getReserves();

    // check allowance
    if (!fromTokenState!.isETH && !fromTokenState!.approved) {
      await ERC20__factory.connect(fromTokenState!.address, signer!).approve(
        router!.address,
        ethers.constants.MaxUint256,
      );
    }
    if (!toTokenState!.isETH && !toTokenState!.approved) {
      await ERC20__factory.connect(toTokenState!.address, signer!).approve(
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

    if (fromTokenState!.isETH || toTokenState!.isETH) {
      const tokenAddress = fromTokenState!.isETH
        ? toTokenState!.address
        : fromTokenState!.address;
      const ethAmount = fromTokenState!.isETH ? fromTokenAmount : toTokenAmount;
      const tokenAmount = fromTokenState!.isETH
        ? toTokenAmount
        : fromTokenAmount;

      await router!.addLiquidityETH(
        tokenAddress,
        tokenAmount,
        tokenAmount.mul(97).div(100),
        ethAmount.mul(97).div(100),
        signerAddress!,
        await getDeadline(signer!),
        { value: ethAmount },
      );
    } else {
      await router!.addLiquidity(
        fromTokenState!.isETH ? WETH!.address : fromTokenState!.address,
        toTokenState!.isETH ? WETH!.address : toTokenState!.address,
        fromTokenAmount,
        toTokenAmount,
        fromTokenAmount.mul(97).div(100),
        toTokenAmount.mul(97).div(100),
        signerAddress!,
        await getDeadline(signer!),
      );
    }

    await setToToken(toToken); // update all state
  };

  return (
    <div
      style={{ marginTop: '90px', display: 'flex', justifyContent: 'center' }}
    >
      <div
        style={{
          width: '400px',
          height: '800px',
          padding: '20px 40px',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '20px',
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
          boxSizing: 'border-box',
        }}
      >
        <Typography style={{ fontSize: '24px', textAlign: 'center' }}>
          Add Liquidity
        </Typography>
        <Typography
          style={{
            margin: '45px 0 30px 0',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          Deposit Amounts
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
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
            }}
          >
            <input
              disabled={!connected}
              inputMode="numeric"
              pattern="[-+]?[0-9]*[.,]?[0-9]+"
              value={fromTokenAmountInput}
              onChange={(e) => setFromTokenAmountInput(e.target.value)}
            />
            <Typography
              style={{ marginTop: '8px', fontSize: '12px', color: '#A5A5A5' }}
            >
              $1,662.24
            </Typography>
          </div>
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
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
            }}
          >
            <input
              disabled={!connected}
              inputMode="numeric"
              pattern="[-+]?[0-9]*[.,]?[0-9]+"
              value={toTokenAmountInput}
              onChange={(e) => setToTokenAmountInput(e.target.value)}
            />
            <Typography
              style={{ marginTop: '8px', fontSize: '12px', color: '#A5A5A5' }}
            >
              $1,662.24
            </Typography>
          </div>
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
        <div
          style={{
            width: '100%',
            marginTop: '20px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: secondary,
            borderRadius: '16px',
            boxSizing: 'border-box',
          }}
        >
          <Typography
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            APR
          </Typography>
          <div
            style={{
              marginTop: '16px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography style={{ fontSize: '12px' }}>Total APR:</Typography>
            <Typography style={{ color: primary, fontSize: '12px' }}>
              9.26%
            </Typography>
          </div>
          <div
            style={{
              marginTop: '12px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography style={{ fontSize: '12px' }}>Fee APR:</Typography>
            <Typography style={{ color: primary, fontSize: '12px' }}>
              6.63%
            </Typography>
          </div>
          <div
            style={{
              marginTop: '12px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography style={{ fontSize: '12px' }}>Reward APR:</Typography>
            <Typography style={{ color: primary, fontSize: '12px' }}>
              2.63%
            </Typography>
          </div>
        </div>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="With Staking"
        />
        <PrimaryContainedButton
          width="100%"
          height="45px"
          fontSize="18px"
          text="Add"
          borderRadius="20px"
          onClick={addLiquidity}
        />
      </div>
    </div>
  );
}
