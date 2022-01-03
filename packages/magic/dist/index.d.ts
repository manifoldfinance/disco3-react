import type { Actions } from '@disco3/types';
import { Connector } from '@disco3/types';
import type { LoginWithMagicLinkConfiguration, Magic as MagicInstance, MagicSDKAdditionalConfiguration } from 'magic-sdk';
export interface MagicConnectorArguments extends MagicSDKAdditionalConfiguration {
    apiKey: string;
}
export declare class Magic extends Connector {
    private readonly options;
    magic?: MagicInstance;
    constructor(actions: Actions, options: MagicConnectorArguments);
    private startListening;
    activate(configuration: LoginWithMagicLinkConfiguration): Promise<void>;
}
