import { Slider, Typography } from '@mui/material';
import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddIcon from '@mui/icons-material/Add';
import { primary, secondary } from '../../components/util/colors';
import TOKENLIST from '../../resources/token-list.json';
import { PrimaryContainedButton } from '../../components/util/button';

export default function RemovePool() {
  return (
    <div
      style={{ marginTop: '90px', display: 'flex', justifyContent: 'center' }}
    >
      <div
        style={{
          width: '830px',
          padding: '20px 40px',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '20px',
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
          boxSizing: 'border-box',
        }}
      >
        <Typography style={{ fontSize: '24px', textAlign: 'center' }}>
          Remove Liquidity
        </Typography>
        <Typography
          style={{ margin: '50px 0 24px 0', color: primary, fontSize: '12px' }}
        >
          Tip: Removing pool ... Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Error voluptate nobis impedit autem porro, quaerat
          assumenda eos labore? Nesciunt at vel assumenda, unde dolores delectus
          accusantium ut laboriosam nulla distinctio.
        </Typography>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '410px', marginRight: '16px' }}>
            <div
              style={{
                width: '100%',
                marginBottom: '18px',
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: secondary,
                borderRadius: '16px',
                boxSizing: 'border-box',
              }}
            >
              <Typography style={{ fontSize: '12px' }}>
                Remove Amount
              </Typography>
              <Typography style={{ fontSize: '40px' }}>25%</Typography>
              <Slider
                size="small"
                style={{ color: primary }}
                defaultValue={0}
                aria-label="Small"
                valueLabelDisplay="auto"
              />
              <div style={{ display: 'flex' }}>
                <div
                  style={{
                    width: '40px',
                    height: '24px',
                    marginRight: '12px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderRadius: '6px',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  25%
                </div>
                <div
                  style={{
                    width: '40px',
                    height: '24px',
                    marginRight: '12px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderRadius: '6px',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  50%
                </div>
                <div
                  style={{
                    width: '40px',
                    height: '24px',
                    marginRight: '12px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderRadius: '6px',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  75%
                </div>
                <div
                  style={{
                    width: '40px',
                    height: '24px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderRadius: '6px',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  100%
                </div>
              </div>
            </div>
            <div
              style={{
                width: '100%',
                padding: '16px 20px',
                backgroundColor: secondary,
                borderRadius: '16px',
                boxSizing: 'border-box',
                cursor: 'pointer',
              }}
            >
              <Typography
                style={{
                  width: '100%',
                  marginBottom: '12px',
                  fontSize: '12px',
                }}
              >
                Your Position
              </Typography>
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
                  marginBottom: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Typography style={{ fontSize: '12px' }}>
                  Your total pool tokens:
                </Typography>
                <Typography style={{ fontSize: '12px' }}>
                  0.000000001087
                </Typography>
              </div>
              <div
                style={{
                  marginBottom: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Typography style={{ fontSize: '12px' }}>
                  Pooled ETH:
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography style={{ marginRight: '8px', fontSize: '12px' }}>
                    0.00000603019
                  </Typography>
                  <img
                    style={{
                      width: '16px',
                      height: '16px',
                      marginRight: '-8px',
                    }}
                    src={TOKENLIST.tokenList[0].logoURI}
                    alt="token-logo"
                  />
                </div>
              </div>
              <div
                style={{
                  marginBottom: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Typography style={{ fontSize: '12px' }}>
                  Pooled USDC:
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography style={{ marginRight: '8px', fontSize: '12px' }}>
                    0.00000603019
                  </Typography>
                  <img
                    style={{
                      width: '16px',
                      height: '16px',
                      marginRight: '-8px',
                    }}
                    src={TOKENLIST.tokenList[1].logoURI}
                    alt="token-logo"
                  />
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Typography style={{ fontSize: '12px' }}>
                  Your pool share:
                </Typography>
                <Typography style={{ fontSize: '12px' }}>0.000242%</Typography>
              </div>
            </div>
          </div>
          <ArrowForwardIcon
            style={{ margin: '70px 16px 0 0', color: primary }}
          />
          <div
            style={{
              width: '300px',
            }}
          >
            <div
              style={{
                marginBottom: '16px',
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: secondary,
                borderRadius: '16px',
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'end',
                }}
              >
                <Typography
                  style={{
                    marginRight: '8px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                  }}
                >
                  Receive Amount
                </Typography>
                <Typography style={{ fontSize: '12px', fontWeight: 'normal' }}>
                  (include swap fee)
                </Typography>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    style={{
                      fontSize: '16px',
                      color: '#575757',
                    }}
                  >
                    0.00000594
                  </Typography>
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
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    style={{
                      fontSize: '16px',
                      color: '#575757',
                    }}
                  >
                    0.1045
                  </Typography>
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
                </div>
              </div>
              <div
                style={{
                  margin: '16px 0',
                  textAlign: 'center',
                }}
              >
                <AddIcon style={{ color: primary, fontSize: '20px' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'end' }}>
                <Typography
                  style={{
                    marginBottom: '8px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                  }}
                >
                  Staking Reward
                </Typography>
              </div>
              <div
                style={{
                  marginBottom: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    style={{
                      fontSize: '16px',
                      color: '#575757',
                    }}
                  >
                    0.00000594
                  </Typography>
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
                </div>
              </div>
              <hr style={{ width: '100%', border: `0.5px solid ${primary}` }} />
              <div style={{ display: 'flex', alignItems: 'end' }}>
                <Typography
                  style={{
                    marginBottom: '8px',
                    fontSize: '24px',
                    fontWeight: 'bold',
                  }}
                >
                  Total Reward
                </Typography>
              </div>
              <div
                style={{
                  height: '80px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    style={{
                      fontSize: '16px',
                      color: '#575757',
                    }}
                  >
                    0.00000594
                  </Typography>
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
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    style={{
                      fontSize: '16px',
                      color: '#575757',
                    }}
                  >
                    0.1045
                  </Typography>
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
                </div>
              </div>
            </div>
            <PrimaryContainedButton
              width="100%"
              height="45px"
              fontSize="18px"
              text="Approve"
              borderRadius="24px"
              onClick=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
