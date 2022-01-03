import { initializeConnector } from '@disco3/core';
import { WalletLink } from '@disco3/walletlink';
import { URLS } from '../chains';

export const [walletLink, hooks] = initializeConnector<WalletLink>(
  (actions) =>
    new WalletLink(actions, {
      url: URLS[1][0],
      appName: 'disco3',
    }),
  [1],
);
