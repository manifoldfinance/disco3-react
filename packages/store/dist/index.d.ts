import type { Actions, Web3ReactStore } from '@disco3/types';
export declare class ChainIdNotAllowedError extends Error {
  constructor(chainId: number, allowedChainIds: number[]);
}
export declare function createWeb3ReactStoreAndActions(
  allowedChainIds?: number[],
): [Web3ReactStore, Actions];
