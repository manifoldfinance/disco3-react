import { ProviderConnector } from './connector/provider.connector';
import { ChainId } from './model/chain.model';
import { DaiPermitParams, PermitParams } from './model/permit.model';
import { PermitRecoveryParams, SyncPermitRecoveryParams } from './model/permit-recovery.model';
export declare class Eip2612PermitUtils {
    protected connector: ProviderConnector;
    constructor(connector: ProviderConnector);
    buildPermitSignature(permitParams: PermitParams, chainId: ChainId, tokenName: string, tokenAddress: string, version?: string): Promise<string>;
    buildPermitCallData(permitParams: PermitParams, chainId: ChainId, tokenName: string, tokenAddress: string, version?: string): Promise<string>;
    buildDaiLikePermitSignature(params: DaiPermitParams, chainId: ChainId, tokenName: string, tokenAddress: string, version?: string): Promise<string>;
    buildDaiLikePermitCallData(permitParams: DaiPermitParams, chainId: ChainId, tokenName: string, tokenAddress: string, version?: string): Promise<string>;
    recoverPermitOwnerFromCallData(params: PermitRecoveryParams): Promise<string>;
    syncRecoverPermitOwnerFromCallData(params: SyncPermitRecoveryParams): string;
    recoverDaiLikePermitOwnerFromCallData(params: PermitRecoveryParams): Promise<string>;
    syncRecoverDaiLikePermitOwnerFromCallData(params: SyncPermitRecoveryParams): string;
    getTokenNonce(tokenAddress: string, walletAddress: string): Promise<number>;
    getDomainTypeHash(tokenAddress: string): Promise<string | null>;
    getPermitTypeHash(tokenAddress: string): Promise<string | null>;
    getDomainSeparator(tokenAddress: string): Promise<string>;
    isDomainWithoutVersion(tokenAddress: string): Promise<boolean>;
    private getTokenNonceByMethod;
}
