import { initializeConnector } from '@disco3/core';
import { Network } from '@disco3/network';
import { URLS } from '../chains';

export const [network, hooks] = initializeConnector<Network>(
  (actions) => new Network(actions, URLS),
  Object.keys(URLS).map((chainId) => Number(chainId)),
);
