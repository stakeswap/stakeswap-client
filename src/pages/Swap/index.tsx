import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { useAtom } from 'jotai';
import { formatUnits } from 'ethers/lib/utils';
import { secondary } from '../../components/util/colors';
import TokenSearchModal from '../../components/TokenSearchModal';
import {
  PrimaryContainedButton,
  TokenSearchButton,
} from '../../components/util/button';
import {
  fromTokenAtom,
  fromTokenStateAtom,
  toTokenAtom,
  toTokenStateAtom,
} from '../../contracts';

function Swap() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [fromTokenState] = useAtom(fromTokenStateAtom);
  const [toTokenState] = useAtom(toTokenStateAtom);

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
          <Typography
            style={{ lineHeight: '36px', fontSize: '36px', opacity: '0.5' }}
          >
            0
          </Typography>
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
          <Typography
            style={{ lineHeight: '36px', fontSize: '36px', opacity: '0.5' }}
          >
            0
          </Typography>
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
            text="Enter an amount"
            borderRadius="16px"
            onClick=""
          />
        </div>
      </div>
    </div>
  );
}

export default Swap;
