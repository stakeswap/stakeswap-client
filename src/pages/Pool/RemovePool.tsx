/* eslint-disable @typescript-eslint/naming-convention */
import { Slider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddIcon from '@mui/icons-material/Add';
import { useAtom } from 'jotai';
import { BigNumber, ethers, FixedNumber, Signature } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { primary, secondary } from '../../components/util/colors';
import TOKENLIST from '../../resources/token-list.json';
import { PrimaryContainedButton } from '../../components/util/button';
import {
  fromTokenAtom,
  fromTokenStateAtom,
  generateSignature,
  getDeadline,
  lpTokenStateAtom,
  pairAtom,
  pairStateAtom,
  routerAtom,
  signerAddressAtom,
  signerAtom,
  sleep,
  sortedAtom,
  stakingStateAtom,
  stakingTokenStateAtom,
  toTokenAtom,
  toTokenStateAtom,
  unstakingDataAtom,
  WETHAtom,
  getPermitNonce,
  stakingPermitSigLocalStorageAtom,
  write__stakingPermitSigLocalStorageAtom,
  splitSignature,
} from '../../contracts';

import CheckAddRemoveBackground from '../../assets/backgrounds/check-add-remove.png';

export default function RemovePool() {
  const [removeAmountPercent, setRemoveAmountPercent] = useState<number>(0);

  const handleRemoveAmountPercent = (
    event: Event,
    newValue: number | number[],
  ) => {
    setRemoveAmountPercent(newValue as number);
  };

  const handleRemoveAmountPercentConstant = (newValue: number) => {
    setRemoveAmountPercent(newValue as number);
  };

  const [fromToken] = useAtom(fromTokenAtom);
  const [toToken, setToToken] = useAtom(toTokenAtom);
  const [signer] = useAtom(signerAtom);
  const [signerAddress] = useAtom(signerAddressAtom);
  const [fromTokenState] = useAtom(fromTokenStateAtom);
  const [toTokenState] = useAtom(toTokenStateAtom);
  const [lpTokenState] = useAtom(lpTokenStateAtom);
  const [stakingTokenState, setStakingTokenState] = useAtom(
    stakingTokenStateAtom,
  );

  const [, write__stakingPermitSigLocalStorage] = useAtom(
    write__stakingPermitSigLocalStorageAtom,
  );
  const [stakingPermitSigLocalStorage, setstakingPermitSigLocalStorage] =
    useAtom(stakingPermitSigLocalStorageAtom);

  const [pairState] = useAtom(pairStateAtom);
  const [stakingState, setStakingState] = useAtom(stakingStateAtom);

  const [WETH] = useAtom(WETHAtom);
  const [router] = useAtom(routerAtom);
  const [pair] = useAtom(pairAtom);
  const [sorted] = useAtom(sortedAtom);
  const [unstakingData] = useAtom(unstakingDataAtom);

  useEffect(() => {
    if (!toTokenState) setToToken(toToken);
  }, [toTokenState, toToken, setToToken]);

  const connected =
    fromToken &&
    toToken &&
    signer &&
    signerAddress &&
    fromTokenState &&
    toTokenState &&
    lpTokenState &&
    stakingTokenState &&
    WETH &&
    router &&
    pair &&
    pairState &&
    stakingState &&
    sorted !== null;

  useEffect(() => {
    if (!unstakingData && !stakingPermitSigLocalStorage)
      write__stakingPermitSigLocalStorage();
  }, [
    unstakingData,
    write__stakingPermitSigLocalStorage,
    stakingPermitSigLocalStorage,
    connected,
  ]);

  const totalLPAmount =
    !connected || stakingState.totalSupply.eq(0)
      ? BigNumber.from(0)
      : lpTokenState.balance.add(
          stakingState.lpBalance
            .mul(stakingTokenState.balance)
            .div(stakingState.totalSupply),
        );

  const pooledETH =
    !connected || pairState.totalSupply.eq(0)
      ? BigNumber.from(0)
      : pairState.ethReserve;
  const pooledToken =
    !connected || pairState.totalSupply.eq(0)
      ? BigNumber.from(0)
      : pairState.tokenReserve;

  const tokenDecimals = !connected
    ? 18
    : fromTokenState.isETH
    ? toTokenState.decimals
    : fromTokenState.decimals;
  const sharesPercent =
    !connected || pairState.totalSupply.eq(0)
      ? '0'
      : FixedNumber.fromValue(totalLPAmount, 18)
          .mulUnsafe(FixedNumber.fromString('100'))
          .divUnsafe(FixedNumber.fromValue(pairState.totalSupply, 18))
          .toString();

  // asume price
  // TODO: fetch token price from coingecko
  const priceETH = 1560;
  const priceToken = 0.98;

  const pooledETHUSD =
    parseFloat(FixedNumber.fromValue(pooledETH, 18).toString()) * priceETH;
  const pooledTokenUSD =
    parseFloat(FixedNumber.fromValue(pooledToken, tokenDecimals).toString()) *
    priceToken;
  const totalPooledUSD = pooledETHUSD + pooledTokenUSD;

  // from staking reward
  const rewardETH = unstakingData?.rewardToStaker ?? BigNumber.from(0);
  const rewardETHUSD =
    parseFloat(FixedNumber.fromValue(rewardETH, 18).toString()) * priceETH;

  // from LP portion of pool
  const receiveETH =
    !lpTokenState || !pairState || pairState?.totalSupply.eq(0)
      ? BigNumber.from(0)
      : pooledETH
          .mul(totalLPAmount)
          .div(pairState.totalSupply)
          .mul(removeAmountPercent)
          .div(100);
  const receiveToken =
    !lpTokenState || !pairState || pairState?.totalSupply.eq(0)
      ? BigNumber.from(0)
      : pooledToken
          .mul(totalLPAmount)
          .div(pairState.totalSupply)
          .mul(removeAmountPercent)
          .div(100);

  const unstakeAndremoveLiquidityWithPermit = async () => {
    if (!connected) {
      return;
    }

    if (stakingTokenState.approved) {
      await router.unstakeAndRemoveLiquidity(
        fromTokenState.isETH ? toTokenState.address : fromTokenState.address,
        stakingTokenState.balance.mul(removeAmountPercent).div(100),
        getDeadline(signer),
      );
    } else {
      const sig = stakingPermitSigLocalStorage;
      if (!sig) {
        return;
      }

      await router.unstakeAndRemoveLiquidityWithPermit(
        fromTokenState.isETH ? toTokenState.address : fromTokenState.address,
        stakingTokenState.balance.mul(removeAmountPercent).div(100),
        getDeadline(signer),
        ...splitSignature(sig),
      );
    }
    setToToken(toToken); // update

    console.log('LIQUIDITY REMOVED');
  };

  return (
    <div
      style={{
        width: '1440px',
        height: '1024px',
        backgroundImage: `url(${CheckAddRemoveBackground})`,
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        style={{
          marginTop: '90px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '830px',
            padding: '20px 40px',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '20px',
            backgroundColor: 'white',
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
            boxSizing: 'border-box',
          }}
        >
          <Typography style={{ fontSize: '24px', textAlign: 'center' }}>
            Remove Liquidity
          </Typography>
          <Typography
            style={{
              margin: '50px 0 24px 0',
              color: primary,
              fontSize: '12px',
            }}
          >
            Tip: Removing pool ... Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Error voluptate nobis impedit autem porro, quaerat
            assumenda eos labore? Nesciunt at vel assumenda, unde dolores
            delectus accusantium ut laboriosam nulla distinctio.
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
                <Typography style={{ fontSize: '40px' }}>
                  {removeAmountPercent}%
                </Typography>
                <Slider
                  size="small"
                  style={{ color: primary }}
                  defaultValue={0}
                  value={removeAmountPercent}
                  aria-label="Small"
                  valueLabelDisplay="auto"
                  onChange={handleRemoveAmountPercent}
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
                    onClick={() => handleRemoveAmountPercentConstant(25)}
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
                    onClick={() => handleRemoveAmountPercentConstant(50)}
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
                    onClick={() => handleRemoveAmountPercentConstant(75)}
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
                    onClick={() => handleRemoveAmountPercentConstant(100)}
                  >
                    MAX
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
                    {formatUnits(totalLPAmount, 18)}
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
                    <Typography
                      style={{ marginRight: '8px', fontSize: '12px' }}
                    >
                      {formatUnits(pooledETH, 18)}
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
                    <Typography
                      style={{ marginRight: '8px', fontSize: '12px' }}
                    >
                      {formatUnits(pooledToken, tokenDecimals)}
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
                  <Typography style={{ fontSize: '12px' }}>
                    {sharesPercent}%
                  </Typography>
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
                  <Typography
                    style={{ fontSize: '12px', fontWeight: 'normal' }}
                  >
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
                      {formatUnits(receiveETH, 18)}
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
                      {formatUnits(receiveToken, tokenDecimals)}
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
                      {formatUnits(rewardETH, 18)}
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
                <hr
                  style={{ width: '100%', border: `0.5px solid ${primary}` }}
                />
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
                      {formatUnits(receiveETH.add(rewardETH), 18)}
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
                      {formatUnits(receiveToken, tokenDecimals)}
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
                text="Remove Liquidity"
                borderRadius="24px"
                onClick={unstakeAndremoveLiquidityWithPermit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
