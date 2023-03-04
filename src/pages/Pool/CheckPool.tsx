import { Typography } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { PrimaryContainedButton } from '../../components/util/button';
import TOKENLIST from '../../resources/token-list.json';
import ETHUSDCPair from '../../assets/eth-usdc.png';
import MotionGraphic from '../../assets/cooking-motion-graphic.gif';
import { secondary } from '../../components/util/colors';

export default function CheckPool() {
  const history = useHistory();

  return (
    <div
      style={{
        marginTop: '90px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '840px',
          height: '700px',
          padding: '20px 40px',
          borderRadius: '20px',
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            marginBottom: '28px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              style={{
                width: '30px',
                height: '30px',
                marginRight: '-8px',
              }}
              src={TOKENLIST.tokenList[0].logoURI}
              alt="token-logo"
            />
            <img
              style={{
                width: '30px',
                height: '30px',
                marginRight: '8px',
              }}
              src={TOKENLIST.tokenList[1].logoURI}
              alt="token-logo"
            />
            <Typography
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              ETH / USDC
            </Typography>
          </div>
          <PrimaryContainedButton
            width="180px"
            height="40px"
            fontSize="18px"
            text="Remove Liquidity"
            borderRadius="12px"
            onClick={() => {
              history.push('/pools/1/remove');
            }}
          />
        </div>
        <div
          style={{
            width: '760px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              width: '330px',
              height: '500px',
              display: 'flex',
              justifyContent: 'center',
              borderRadius: '16px',
              boxShadow:
                'rgba(50, 50, 93, 0.25) 0px 0px 20px -20px inset, rgba(0, 0, 0, 0.3) 0px 5px 36px -18px inset',
              boxSizing: 'border-box',
            }}
          >
            <img
              style={{
                marginTop: '40px',
                position: 'absolute',
                height: '25px',
              }}
              src={ETHUSDCPair}
              alt="ETHUSDCPair"
            />
            <img
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              src={MotionGraphic}
              alt="MotionGraphic"
            />
          </div>
          <div
            style={{
              width: '410px',
              height: '500px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                width: '100%',
                padding: '20px',
                backgroundColor: secondary,
                borderRadius: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'end' }}>
                <Typography
                  style={{
                    marginRight: '8px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                  }}
                >
                  Liquidity
                </Typography>
                <Typography style={{ fontSize: '12px', fontWeight: 'normal' }}>
                  (include swap fee)
                </Typography>
              </div>
              <Typography style={{ fontSize: '32px', fontWeight: 'bold' }}>
                $ 0.20
              </Typography>
              <div
                style={{
                  height: '80px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  background: 'white',
                  borderRadius: '20px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      style={{
                        width: '20px',
                        height: '20px',
                        marginRight: '8px',
                      }}
                      src={TOKENLIST.tokenList[0].logoURI}
                      alt="token-logo"
                    />
                    <Typography
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#575757',
                      }}
                    >
                      ETH
                    </Typography>
                  </div>
                  <Typography
                    style={{
                      fontSize: '16px',
                      color: '#575757',
                    }}
                  >
                    0.00000594
                  </Typography>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
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
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#575757',
                      }}
                    >
                      USDC
                    </Typography>
                  </div>
                  <Typography
                    style={{
                      fontSize: '16px',
                      color: '#575757',
                    }}
                  >
                    0.1045
                  </Typography>
                </div>
              </div>
            </div>
            <div
              style={{
                width: '100%',
                marginTop: '12px',
                padding: '20px',
                backgroundColor: secondary,
                borderRadius: '16px',
              }}
            >
              <Typography
                style={{
                  marginRight: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                }}
              >
                Staking Reward
              </Typography>
              <Typography style={{ fontSize: '32px', fontWeight: 'bold' }}>
                $ 0.01
              </Typography>
              <div
                style={{
                  height: '25px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  background: 'white',
                  borderRadius: '20px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      style={{
                        width: '20px',
                        height: '20px',
                        marginRight: '8px',
                      }}
                      src={TOKENLIST.tokenList[0].logoURI}
                      alt="token-logo"
                    />
                    <Typography
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#575757',
                      }}
                    >
                      ETH
                    </Typography>
                  </div>
                  <Typography
                    style={{
                      fontSize: '16px',
                      color: '#575757',
                    }}
                  >
                    0.00000594
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
