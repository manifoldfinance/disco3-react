import type { Actions } from '@disco3/types';
import { Connector } from '@disco3/types';
import type { WalletLink as WalletLinkInstance, WalletLinkOptions } from 'walletlink/dist/WalletLink';
export declare class WalletLink extends Connector {
    private readonly options;
    private eagerConnection?;
    walletLink: WalletLinkInstance | undefined;
    provider: ReturnType<WalletLinkInstance['makeWeb3Provider']> | undefined;
    constructor(actions: Actions, options: WalletLinkOptions & {
        url: string;
    }, connectEagerly?: boolean);
    private initialize;
    activate(): Promise<void>;
    deactivate(): void;
}
