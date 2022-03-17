/// <reference types="node" />
import { EIP712TypedData } from './model/eip712.model';
import { DaiPermitParams, PermitParams } from './model/permit.model';
import { PermitTypedDataParamsModel } from './model/permit-typed-data-params.model';
export declare function inputIsNotNullOrUndefined<T>(input: null | undefined | T): input is T;
export declare function buildPermitTypedData({ chainId, tokenName, tokenAddress, params, isDomainWithoutVersion, version, permitModelFields }: PermitTypedDataParamsModel): EIP712TypedData;
export declare function fromRpcSig(sig: string): {
    v: number;
    r: Buffer;
    s: Buffer;
};
export declare function getPermitContractCallParams(permitParams: PermitParams, permitSignature: string): (string | number | Buffer)[];
export declare function getDaiPermitContractCallParams(permitParams: DaiPermitParams, permitSignature: string): (string | number | boolean | Buffer)[];
