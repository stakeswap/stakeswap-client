import {
  FormControlLabel,
  Switch,
  Typography,
  alpha,
  styled,
  Tooltip,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAtom } from 'jotai';
import { BigNumber, FixedNumber, Signature } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { PrimaryContainedButton } from '../../components/util/button';
import TOKENLIST from '../../resources/token-list.json';
import ETHUSDCPair from '../../assets/eth-usdc.png';
import MotionGraphic from '../../assets/cooking-motion-graphic.gif';
import { primary, secondary } from '../../components/util/colors';
import {
  fromTokenAtom,
  fromTokenStateAtom,
  generateSignature,
  getDeadline,
  getPermitNonce,
  lpTokenStateAtom,
  pairAtom,
  pairStateAtom,
  permitMapAtom,
  routerAtom,
  signerAddressAtom,
  signerAtom,
  sortedAtom,
  stakingStateAtom,
  stakingTokenStateAtom,
  toTokenAtom,
  toTokenStateAtom,
  unstakingDataAtom,
  WETHAtom,
} from '../../contracts';
import CheckAddRemoveBackground from '../../assets/backgrounds/check-add-remove.png';

const PrimarySwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: primary,
    '&:hover': {
      backgroundColor: alpha(primary, theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: primary,
  },
}));

export default function CheckPool() {
  const history = useHistory();

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
  const [permitMap, setPermitMap] = useAtom(permitMapAtom);

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

  // request STK permit signature
  useEffect(() => {
    if (!connected) return;
    if (stakingTokenState.approved) return;

    (async () => {
      const nonce = await getPermitNonce(signer, stakingTokenState.address);

      permitMap[stakingTokenState.address] =
        permitMap[stakingTokenState.address] ?? {};
      let sig: null | Signature = permitMap[stakingTokenState.address][nonce];

      if (!sig) {
        sig = await generateSignature(
          signer,
          router.address,
          stakingTokenState.address,
        );

        permitMap[stakingTokenState.address][nonce] = sig;
        setPermitMap(permitMap);
      }

      // load unstaking data
      setStakingState(stakingState);
    })().catch(console.error);
  }, [
    connected,
    router,
    signer,
    stakingTokenState,
    permitMap,
    setPermitMap,
    setStakingTokenState,
    setStakingState,
    stakingState,
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
      : pairState.ethReserve.mul(totalLPAmount).div(pairState.totalSupply);
  const pooledToken =
    !connected || pairState.totalSupply.eq(0)
      ? BigNumber.from(0)
      : pairState.tokenReserve.mul(totalLPAmount).div(pairState.totalSupply);

  const tokenDecimals = !connected
    ? 18
    : fromTokenState.isETH
    ? toTokenState.decimals
    : fromTokenState.decimals;

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

  const rewardETH = unstakingData?.rewardToStaker ?? BigNumber.from(0);
  const rewardETHUSD =
    parseFloat(FixedNumber.fromValue(rewardETH, 18).toString()) * priceETH;

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
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '840px',
            height: '700px',
            padding: '20px 40px',
            borderRadius: '20px',
            backgroundColor: 'white',
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
                src={fromToken.logoURI}
                alt="token-logo"
              />
              <img
                style={{
                  width: '30px',
                  height: '30px',
                  marginRight: '8px',
                }}
                src={toToken.logoURI}
                alt="token-logo"
              />
              <Typography
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                }}
              >
                {fromToken.symbol} / {toToken.symbol}
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
              width: '720px',
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
                  'rgba(50, 50, 93, 0.25) 0px 30px 50px -20px inset, rgba(0, 0, 0, 0.3) 0px 5px 36px -18px inset',
                boxSizing: 'border-box',
              }}
            >
              <img
                style={{
                  height: '110px',
                  marginTop: '80px',
                  position: 'absolute',
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
                width: '360px',
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
                  <Typography
                    style={{ fontSize: '12px', fontWeight: 'normal' }}
                  >
                    (include swap fee)
                  </Typography>
                </div>
                <Typography style={{ fontSize: '32px', fontWeight: 'bold' }}>
                  $ {totalPooledUSD}
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
                      {formatUnits(pooledETH, 18)}
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
                      {formatUnits(pooledToken, tokenDecimals)}
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
                  $ {rewardETHUSD}
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
                      {formatUnits(rewardETH, 18)}
                    </Typography>
                  </div>
                </div>
              </div>
              <Tooltip
                title="We are waiting for Shanghai Upgrade!!!"
                placement="top"
                arrow
              >
                <div
                  style={{
                    marginTop: '30px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <PrimarySwitch disabled />
                  <Typography style={{ color: '#575757' }}>
                    With Lock-up (14 days)
                  </Typography>
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
