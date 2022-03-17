"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDaiPermitContractCallParams = exports.getPermitContractCallParams = exports.fromRpcSig = exports.buildPermitTypedData = exports.inputIsNotNullOrUndefined = void 0;
const eip_2612_permit_const_1 = require("./eip-2612-permit.const");
function inputIsNotNullOrUndefined(input) {
    return input !== null && input !== undefined;
}
exports.inputIsNotNullOrUndefined = inputIsNotNullOrUndefined;
// eslint-disable-next-line max-lines-per-function
function buildPermitTypedData({ chainId, tokenName, tokenAddress, params, isDomainWithoutVersion = false, version = '1', permitModelFields = eip_2612_permit_const_1.eip2612PermitModelFields }) {
    const domainCommon = {
        name: tokenName,
        chainId,
        verifyingContract: tokenAddress
    };
    return {
        types: {
            EIP712Domain: [
                { name: 'name', type: 'string' },
                ...[
                    isDomainWithoutVersion
                        ? null
                        : { name: 'version', type: 'string' },
                ],
                { name: 'chainId', type: 'uint256' },
                { name: 'verifyingContract', type: 'address' },
            ].filter(inputIsNotNullOrUndefined),
            Permit: permitModelFields,
        },
        primaryType: 'Permit',
        domain: isDomainWithoutVersion
            ? domainCommon
            : Object.assign(Object.assign({}, domainCommon), { version }),
        message: params,
    };
}
exports.buildPermitTypedData = buildPermitTypedData;
function fromRpcSig(sig) {
    const signature = Buffer.from(sig.startsWith('0x')
        ? sig.slice(2)
        : sig, 'hex');
    // NOTE: with potential introduction of chainId this might need to be updated
    if (signature.length !== 65) {
        throw new Error('Invalid signature length');
    }
    // support both versions of `eth_sign` responses
    const v = signature[64] < 27
        ? signature[64] + 27
        : signature[64];
    return {
        v: v,
        r: signature.slice(0, 32),
        s: signature.slice(32, 64),
    };
}
exports.fromRpcSig = fromRpcSig;
function getPermitContractCallParams(permitParams, permitSignature) {
    const { v, r, s } = fromRpcSig(permitSignature);
    return [
        permitParams.owner,
        permitParams.spender,
        permitParams.value,
        permitParams.deadline,
        v,
        r,
        s,
    ];
}
exports.getPermitContractCallParams = getPermitContractCallParams;
function getDaiPermitContractCallParams(permitParams, permitSignature) {
    const { v, r, s } = fromRpcSig(permitSignature);
    return [
        permitParams.holder,
        permitParams.spender,
        permitParams.nonce,
        permitParams.expiry,
        true,
        v,
        r,
        s,
    ];
}
exports.getDaiPermitContractCallParams = getDaiPermitContractCallParams;
//# sourceMappingURL=eip-2612-permit.helper.js.map