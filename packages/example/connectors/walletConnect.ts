import { initializeConnector } from '@disco3/core';
import { WalletConnect } from '@disco3/walletconnect';
import { URLS } from '../chains';

export const [walletConnect, hooks] = initializeConnector<WalletConnect>(
  (actions) =>
    new WalletConnect(actions, {
      rpc: Object.keys(URLS).reduce((accumulator, chainId) => {
        accumulator[chainId] = URLS[Number(chainId)][0];
        return accumulator;
      }, {}),
    }),
  Object.keys(URLS).map((chainId) => Number(chainId)),
);
