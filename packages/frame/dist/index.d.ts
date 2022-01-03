import type { Actions } from '@disco3/types';
import { Connector } from '@disco3/types';
export declare class NoFrameError extends Error {
    constructor();
}
interface FrameConnectorArguments {
    infuraId?: string;
    alchemyId?: string;
    origin?: string;
}
export declare class Frame extends Connector {
    private readonly options?;
    private providerPromise?;
    constructor(actions: Actions, options?: FrameConnectorArguments, connectEagerly?: boolean);
    private startListening;
    activate(): Promise<void>;
}
export {};
