import React from 'react';
import { makeStyles } from '@mui/styles';
import { debounce, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { ethers } from 'ethers';
import { useAtom } from 'jotai';
import { PrimaryContainedButton } from '../util/button';
import {
  providerAtom,
  signerAddressAtom,
  stakingStateAtom,
  toTokenAtom,
} from '../../contracts';
import Logo from '../../assets/logo-with-typo.png';

const DEV = process.env.NODE_ENV === 'development';

const useStyles: any = makeStyles({
  root: {
    height: '64px',
    width: '1440px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 'auto',
    height: '32px',
    marginLeft: '50px',
    cursor: 'pointer',
  },
  link: {
    marginRight: '16px',
    fontSize: '14px',
    fontWeight: 'normal!important',
    cursor: 'pointer',
  },
  linkGroup: {
    width: '126px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginRight: '5%',
  },
});

export default function Navigation() {
  const classes = useStyles();
  const history = useHistory();

  const [provider, setProvider] = useAtom(providerAtom);
  const [signerAddress] = useAtom(signerAddressAtom);

  const [toToken, setToToken] = useAtom(toTokenAtom);
  const [stakingState, setStakingState] = useAtom(stakingStateAtom);

  const handleConnectWallet = async () => {
    const newProvider = new ethers.providers.Web3Provider(
      window.ethereum,
      'any',
    );
    await newProvider.send('eth_requestAccounts', []);

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: DEV ? '0x760' : '0x1' }], // 0x760 = 1888 = forked testnet
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

  return (
    <div className={classes.root}>
      <img
        className={classes.logo}
        src={Logo}
        alt="logo"
        onClick={() => {
          history.push('/');
        }}
        height={16}
      />
      <div className={classes.linkGroup}>
        <Typography
          className={classes.link}
          onClick={() => {
            history.push('/swaps');
          }}
        >
          Swap
        </Typography>
        <Typography
          className={classes.link}
          onClick={() => {
            history.push('/pools');
          }}
        >
          Pool
        </Typography>
      </div>

      {signerAddress ? (
        <PrimaryContainedButton
          width="160px"
          height="36px"
          text={`${signerAddress.slice(0, 6)}...${signerAddress.slice(-4)}`}
          fontSize="15px"
          borderRadius="10px"
          onClick={() => {
            console.log('signer: %s', signerAddress);
          }}
        />
      ) : (
        <PrimaryContainedButton
          width="160px"
          height="36px"
          text="Connect Wallet"
          fontSize="15px"
          borderRadius="10px"
          onClick={handleConnectWallet}
        />
      )}
    </div>
  );
}
