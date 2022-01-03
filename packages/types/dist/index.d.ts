/// <reference types="node" />
import type { EventEmitter } from 'node:events';
import type { State, StoreApi } from 'zustand/vanilla';
export interface Web3ReactState extends State {
  chainId: number | undefined;
  accounts: string[] | undefined;
  activating: boolean;
  error: Error | undefined;
}
export declare type Web3ReactStore = StoreApi<Web3ReactState>;
export interface Web3ReactStateUpdate {
  chainId?: number;
  accounts?: string[];
}
export interface Actions {
  startActivation: () => () => void;
  update: (stateUpdate: Web3ReactStateUpdate) => void;
  reportError: (error: Error) => void;
}
export interface RequestArguments {
  readonly method: string;
  readonly params?: readonly unknown[] | object;
}
export interface Provider extends EventEmitter {
  request(args: RequestArguments): Promise<unknown>;
}
export interface ProviderConnectInfo {
  readonly chainId: string;
}
export interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}
export interface ProviderMessage {
  readonly type: string;
  readonly data: unknown;
}
export declare abstract class Connector {
  provider: Provider | undefined;
  protected readonly actions: Actions;
  constructor(actions: Actions);
  abstract activate(...args: unknown[]): Promise<void> | void;
  deactivate?(...args: unknown[]): Promise<void> | void;
}
