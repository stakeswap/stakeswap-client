import { ethers } from 'ethers';

declare global {
  interface Window {
    provider: ethers.providers.Web3Provider;
    ethereum: any;
  }
}
