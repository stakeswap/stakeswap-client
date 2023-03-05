/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useState } from 'react';
import { debounce, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import WalletIcon from '@mui/icons-material/Wallet';
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';
import { useAtom } from 'jotai';
import { formatUnits } from 'ethers/lib/utils';
import { BigNumber, ethers, FixedNumber, Signature } from 'ethers';
import {
  GradientContainedButton,
  PrimaryContainedButton,
} from '../../components/util/button';
import TOKENLIST from '../../resources/token-list.json';
import { secondary } from '../../components/util/colors';
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
  sortedAtom,
  stakingStateAtom,
  stakingTokenStateAtom,
  toTokenAtom,
  toTokenStateAtom,
  WETHAtom,
  getPermitNonce,
  write__stakingPermitSigLocalStorageAtom,
  unstakingDataAtom,
  stakingPermitSigLocalStorageAtom,
  providerAtom,
} from '../../contracts';
import { ERC20__factory } from '../../typechain';
import PoolBackground from '../../assets/backgrounds/pool.png';

function Pool() {
  const history = useHistory();

  const [fromToken] = useAtom(fromTokenAtom);
  const [toToken, setToToken] = useAtom(toTokenAtom);
  const [signer] = useAtom(signerAtom);
  const [provider, setProvider] = useAtom(providerAtom);
  const [signerAddress] = useAtom(signerAddressAtom);
  const [fromTokenState] = useAtom(fromTokenStateAtom);
  const [toTokenState] = useAtom(toTokenStateAtom);
  const [lpTokenState] = useAtom(lpTokenStateAtom);
  const [stakingTokenState, setStakingTokenState] = useAtom(
    stakingTokenStateAtom,
  );

  const [pairState] = useAtom(pairStateAtom);
  const [stakingState, setStakingState] = useAtom(stakingStateAtom);

  const [WETH] = useAtom(WETHAtom);
  const [router] = useAtom(routerAtom);
  const [pair] = useAtom(pairAtom);
  const [sorted] = useAtom(sortedAtom);
  const [unstakingData] = useAtom(unstakingDataAtom);
  const [stakingPermitSigLocalStorage] = useAtom(
    stakingPermitSigLocalStorageAtom,
  );

  const [, write__stakingPermitSigLocalStorage] = useAtom(
    write__stakingPermitSigLocalStorageAtom,
  );

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

  const handleConnectWallet = async () => {
    const newProvider = new ethers.providers.Web3Provider(
      window.ethereum,
      'any',
    );
    await newProvider.send('eth_requestAccounts', []);

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x760' }], // 0x760 = 1888 = forked testnet
      });
    } catch (switchErr: any) {
      if (switchErr.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x760',
                chainName: 'StakeSwap - forked testnet',
                nativeCurrency: {
                  name: 'tETH',
                  symbol: 'tETH',
                  decimals: 18,
                },
                rpcUrls: ['http://localhost:1888'], // mainnet-forked localhost testrpc
                // blockExplorerUrls: [],
              },
            ],
          });
        } catch (addErr) {
          console.log(addErr);
        }
      }
      console.log(switchErr);
    }

    setProvider(newProvider);

    const updater = debounce(() => {
      if (toToken) setToToken(toToken);
      if (stakingState) setStakingState(stakingState);
    }, 4000);

    newProvider.on('block', (blockNumber) => {
      updater();
    });
  };

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

  return (
    <div
      style={{
        width: '1440px',
        height: '1024px',
        backgroundImage: `url(${PoolBackground})`,
        backgroundRepeat: 'no-repeat',
      }}
    >
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
          {!signerAddress ? (
            <div />
          ) : (
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
          )}
        </div>
        <div
          style={{
            width: '620px',
            padding: '20px 40px',
            borderRadius: '20px',
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
            boxSizing: 'border-box',
          }}
        >
          {!signerAddress ? (
            <div
              style={{
                width: '100%',
                height: '100%',
                padding: '40px 0',
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
                onClick={handleConnectWallet}
              />
            </div>
          ) : totalLPAmount.lte(1e7) ? (
            <div
              style={{
                width: '100%',
                height: '100%',
                padding: '40px 0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <HighlightAltIcon
                style={{ width: '40px', height: 'auto', marginBottom: '20px' }}
              />
              <Typography
                style={{
                  width: '300px',
                  textAlign: 'center',
                  fontSize: '18px',
                }}
              >
                No liquidity found.
              </Typography>
            </div>
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
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
                    src={fromTokenState?.logoURI ?? fromToken.logoURI}
                    alt="token-logo"
                  />
                  <img
                    style={{
                      width: '20px',
                      height: '20px',
                      marginRight: '8px',
                    }}
                    src={toTokenState?.logoURI ?? toToken.logoURI}
                    alt="token-logo"
                  />
                  <Typography
                    style={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                    }}
                  >
                    {`${fromToken.symbol} / ${toToken.symbol}`}
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
                    Your total LP tokens:
                  </Typography>
                  <Typography style={{ fontSize: '16px' }}>
                    {formatUnits(totalLPAmount, 18)}
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
                    Pooled {fromToken.symbol}:
                  </Typography>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      style={{ marginRight: '8px', fontSize: '16px' }}
                    >
                      {formatUnits(pooledETH, 18)}
                    </Typography>
                    <img
                      style={{
                        width: '20px',
                        height: '20px',
                        marginRight: '-8px',
                      }}
                      src={fromTokenState?.logoURI ?? fromToken.logoURI}
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
                  <Typography style={{ fontSize: '16px' }}>
                    Pooled {toToken.symbol}:
                  </Typography>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      style={{ marginRight: '8px', fontSize: '16px' }}
                    >
                      {formatUnits(pooledToken, tokenDecimals)}
                    </Typography>
                    <img
                      style={{
                        width: '20px',
                        height: '20px',
                        marginRight: '-8px',
                      }}
                      src={toTokenState?.logoURI ?? toToken.logoURI}
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
                  <Typography style={{ fontSize: '16px' }}>
                    Your pool share:
                  </Typography>
                  <Typography style={{ fontSize: '16px' }}>
                    {sharesPercent}%
                  </Typography>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Pool;
