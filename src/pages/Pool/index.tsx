import React from 'react';
import { Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
// import WalletIcon from '@mui/icons-material/Wallet';
import {
  // GradientContainedButton,
  PrimaryContainedButton,
} from '../../components/util/button';
import TOKENLIST from '../../resources/token-list.json';
import { secondary } from '../../components/util/colors';

function Pool() {
  const history = useHistory();
  return (
    <div
      style={{
        marginTop: '160px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '620px',
          marginBottom: '30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography style={{ fontSize: '28px' }}>Pools</Typography>
        <PrimaryContainedButton
          width="150px"
          height="40px"
          fontSize="18px"
          text="+ New Liquidity"
          borderRadius="12px"
          onClick={() => {
            history.push('/pools/add');
          }}
        />
        <div />
      </div>
      <div
        style={{
          width: '620px',
          height: '420px',
          padding: '20px 40px',
          borderRadius: '20px',
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
          boxSizing: 'border-box',
        }}
      >
        {/* <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <WalletIcon
            style={{ width: '40px', height: 'auto', marginBottom: '20px' }}
          />
          <Typography
            style={{
              width: '300px',
              marginBottom: '40px',
              textAlign: 'center',
              fontSize: '18px',
            }}
          >
            Please connect your wallet.
          </Typography>
          <GradientContainedButton
            width="300px"
            height="40px"
            fontSize="18px"
            text="Connect a wallet"
            borderRadius="24px"
            onClick=""
          />
        </div> */}
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            style={{
              width: '100%',
              marginBottom: '30px',
              fontSize: '16px',
            }}
          >
            Your Position (1)
          </Typography>
          <div
            style={{
              width: '530px',
              height: '330px',
              padding: '18px 40px',
              backgroundColor: secondary,
              borderRadius: '16px',
              boxSizing: 'border-box',
              cursor: 'pointer',
            }}
            onClick={() => history.push('/pools/1')}
          >
            <div
              style={{
                marginBottom: '28px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <img
                style={{
                  width: '20px',
                  height: '20px',
                  marginRight: '-8px',
                }}
                src={TOKENLIST.tokenList[0].logoURI}
                alt="token-logo"
              />
              <img
                style={{
                  width: '20px',
                  height: '20px',
                  marginRight: '8px',
                }}
                src={TOKENLIST.tokenList[1].logoURI}
                alt="token-logo"
              />
              <Typography
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                }}
              >
                ETH / USDC
              </Typography>
            </div>
            <div
              style={{
                marginBottom: '14px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography style={{ fontSize: '16px' }}>
                Your total pool tokens:
              </Typography>
              <Typography style={{ fontSize: '16px' }}>
                0.000000001087
              </Typography>
            </div>
            <div
              style={{
                marginBottom: '14px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography style={{ fontSize: '16px' }}>Pooled ETH:</Typography>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography style={{ marginRight: '8px', fontSize: '16px' }}>
                  0.00000603019
                </Typography>
                <img
                  style={{
                    width: '20px',
                    height: '20px',
                    marginRight: '-8px',
                  }}
                  src={TOKENLIST.tokenList[0].logoURI}
                  alt="token-logo"
                />
              </div>
            </div>
            <div
              style={{
                marginBottom: '14px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography style={{ fontSize: '16px' }}>Pooled USDC:</Typography>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography style={{ marginRight: '8px', fontSize: '16px' }}>
                  0.00000603019
                </Typography>
                <img
                  style={{
                    width: '20px',
                    height: '20px',
                    marginRight: '-8px',
                  }}
                  src={TOKENLIST.tokenList[1].logoURI}
                  alt="token-logo"
                />
              </div>
            </div>
            <div
              style={{
                marginBottom: '60px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography style={{ fontSize: '16px' }}>
                Your pool share:
              </Typography>
              <Typography style={{ fontSize: '16px' }}>0.000242%</Typography>
            </div>
            <PrimaryContainedButton
              width="100%"
              height="38px"
              fontSize="18px"
              text="Remove"
              borderRadius="12px"
              onClick={() => {
                history.push('pools/1/remove');
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pool;
