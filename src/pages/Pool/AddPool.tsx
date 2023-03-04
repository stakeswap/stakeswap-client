import { FormControlLabel, Switch, Typography } from '@mui/material';
import React, { useState } from 'react';
import TokenSearchModal from '../../components/TokenSearchModal';
import {
  PrimaryContainedButton,
  TokenSearchButton,
} from '../../components/util/button';
import { primary, secondary } from '../../components/util/colors';

export default function AddPool() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
            <Typography
              style={{ lineHeight: '36px', fontSize: '36px', opacity: '0.5' }}
            >
              0
            </Typography>
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
            <TokenSearchButton backgroundColor="white" onClick={handleOpen} />
            <TokenSearchModal open={open} handleClose={handleClose} />
            <Typography
              style={{ marginTop: '8px', fontSize: '12px', color: '#A5A5A5' }}
            >
              Balance: 0
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
            <Typography
              style={{ lineHeight: '36px', fontSize: '36px', opacity: '0.5' }}
            >
              0
            </Typography>
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
            <TokenSearchButton backgroundColor="white" onClick={handleOpen} />
            <TokenSearchModal open={open} handleClose={handleClose} />
            <Typography
              style={{ marginTop: '8px', fontSize: '12px', color: '#A5A5A5' }}
            >
              Balance: 0
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
          onClick=""
        />
      </div>
    </div>
  );
}
