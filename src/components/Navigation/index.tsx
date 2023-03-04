import React from 'react';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { ethers } from 'ethers';
import { useAtom } from 'jotai';
import { PrimaryContainedButton } from '../util/button';
import { providerAtom } from '../../contracts';
import Logo from '../../assets/logo-with-typo.png';

const useStyles: any = makeStyles({
  root: {
    height: '64px',
    width: '100%',
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
      <PrimaryContainedButton
        width="160px"
        height="36px"
        text="Connect Wallet"
        fontSize="15px"
        borderRadius="10px"
        onClick={handleConnectWallet}
      />
    </div>
  );
}
