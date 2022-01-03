/// <reference types="node" />
import type WalletConnectProvider from '@walletconnect/ethereum-provider';
import type { IWCEthRpcConnectionOptions } from '@walletconnect/types';
import type { Actions } from '@disco3/types';
import { Connector } from '@disco3/types';
import type { EventEmitter } from 'node:events';
interface MockWalletConnectProvider extends Omit<WalletConnectProvider, 'on' | 'off' | 'once' | 'removeListener'>, EventEmitter {
}
export declare class WalletConnect extends Connector {
    private readonly options?;
    private eagerConnection?;
    provider: MockWalletConnectProvider | undefined;
    constructor(actions: Actions, options: IWCEthRpcConnectionOptions, connectEagerly?: boolean);
    private initialize;
    activate(): Promise<void>;
    deactivate(): Promise<void>;
}
export {};
