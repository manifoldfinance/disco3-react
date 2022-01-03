import { initializeConnector } from '@disco3/core';
import { MetaMask } from '@disco3/metamask';

export const [metaMask, hooks] = initializeConnector<MetaMask>((actions) => new MetaMask(actions));
