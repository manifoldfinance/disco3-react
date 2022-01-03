import type { Web3ReactHooks } from '@disco3/core';
import type { Connector } from '@disco3/types';
import { frame, hooks as frameHooks } from './frame';
import { hooks as magicHooks, magic } from './magic';
import { hooks as metaMaskHooks, metaMask } from './metaMask';
import { hooks as networkHooks, network } from './network';
import { hooks as walletConnectHooks, walletConnect } from './walletConnect';
import { hooks as walletLinkHooks, walletLink } from './walletLink';

export const connectors: [Connector, Web3ReactHooks][] = [
  [network, networkHooks],
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks],
  [walletLink, walletLinkHooks],
  [frame, frameHooks],
  [magic, magicHooks],
];
