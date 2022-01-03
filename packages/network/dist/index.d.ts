import type { ConnectionInfo } from '@ethersproject/web';
import type { Actions } from '@disco3/types';
import { Connector } from '@disco3/types';
declare type url = string | ConnectionInfo;
export declare class Network extends Connector {
    private urlMap;
    private chainId;
    private providerCache;
    constructor(actions: Actions, urlMap: {
        [chainId: number]: url | url[];
    }, connectEagerly?: boolean);
    private initialize;
    activate(desiredChainId?: number): Promise<void>;
}
export {};
