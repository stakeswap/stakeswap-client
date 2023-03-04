import React from 'react';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { ethers } from 'ethers';
import { useAtom } from 'jotai';
import { ContainedButton } from '../util/button';
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

function Navigation() {
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

  // const handleChangeNetwork = async (changeNetwork) => {
  //   if (!provider || !accounts) {
  //     return;
  //   }
  //   const { chainId } = await provider.getNetwork();

  //   if (chainId !== 80001 && changeNetwork === 'Polygon') {
  //     try {
  //       await window.ethereum.request({
  //         method: 'wallet_switchEthereumChain',
  //         params: [{ chainId: '0x13881' }],
  //       });
  //       setNetwork(changeNetwork);
  //     } catch (switchErr) {
  //       if (switchErr.code === 4902) {
  //         try {
  //           await window.ethereum.request({
  //             method: 'wallet_addEthereumChain',
  //             params: [
  //               {
  //                 chainId: '0x13881',
  //                 chainName: 'Matic Mumbai',
  //                 nativeCurrency: {
  //                   name: 'MATIC',
  //                   symbol: 'MATIC',
  //                   decimals: 18,
  //                 },
  //                 rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
  //                 blockExplorerUrls: ['https://mumbai.ploygonscan.com'],
  //               },
  //             ],
  //           });
  //           setNetwork(changeNetwork);
  //         } catch (addErr) {
  //           console.log(addErr);
  //         }
  //       }
  //       console.log(switchErr);
  //     }
  //   } else if (chainId !== 420 && changeNetwork === 'Optimism') {
  //     try {
  //       await window.ethereum.request({
  //         method: 'wallet_switchEthereumChain',
  //         params: [{ chainId: '0x1A4' }],
  //       });
  //       setNetwork(changeNetwork);
  //     } catch (switchErr) {
  //       if (switchErr.code === 4902) {
  //         try {
  //           await window.ethereum.request({
  //             method: 'wallet_addEthereumChain',
  //             params: [
  //               {
  //                 chainId: '0x1A4',
  //                 chainName: 'Optimism Goerli',
  //                 nativeCurrency: {
  //                   name: 'ETH',
  //                   symbol: 'ETH',
  //                   decimals: 18,
  //                 },
  //                 rpcUrls: ['https://goerli.optimism.io'],
  //                 blockExplorerUrls: ['https://goerli-explorer.optimism.io'],
  //               },
  //             ],
  //           });
  //           setNetwork(changeNetwork);
  //         } catch (addErr) {
  //           console.log(addErr);
  //         }
  //       }
  //       console.log(switchErr);
  //     }
  //   }

  //   handleNetworkClose();
  // };

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
            history.push('/swap');
          }}
        >
          Swap
        </Typography>
        <Typography
          className={classes.link}
          onClick={() => {
            history.push('/pool');
          }}
        >
          Pool
        </Typography>
        <ContainedButton
          width="134px"
          height="36px"
          text="Connect Wallet"
          fontSize="15px"
          borderRadius="10px"
          onClick=""
        />
      </div>
    </div>
  );
}

export default Navigation;
