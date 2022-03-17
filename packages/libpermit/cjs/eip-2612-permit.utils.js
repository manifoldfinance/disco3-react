"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Eip2612PermitUtils = void 0;
const tslib_1 = require("tslib");
const eth_sig_util_1 = require("eth-sig-util");
const eip_2612_permit_const_1 = require("./eip-2612-permit.const");
const eip_2612_permit_helper_1 = require("./eip-2612-permit.helper");
class Eip2612PermitUtils {
    constructor(connector) {
        this.connector = connector;
    }
    buildPermitSignature(permitParams, chainId, tokenName, tokenAddress, version) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const permitData = (0, eip_2612_permit_helper_1.buildPermitTypedData)({
                chainId,
                tokenName,
                tokenAddress,
                params: permitParams,
                isDomainWithoutVersion: yield this.isDomainWithoutVersion(tokenAddress),
                version
            });
            const dataHash = eth_sig_util_1.TypedDataUtils.hashStruct(permitData.primaryType, permitData.message, permitData.types, true).toString('hex');
            return this.connector.signTypedData(permitParams.owner, permitData, dataHash);
        });
    }
    buildPermitCallData(permitParams, chainId, tokenName, tokenAddress, version) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const permitSignature = yield this.buildPermitSignature(permitParams, chainId, tokenName, tokenAddress, version);
            const permitCallData = this.connector.contractEncodeABI(eip_2612_permit_const_1.EIP_2612_PERMIT_ABI, tokenAddress, 'permit', (0, eip_2612_permit_helper_1.getPermitContractCallParams)(permitParams, permitSignature));
            return permitCallData.replace(eip_2612_permit_const_1.EIP_2612_PERMIT_SELECTOR, '0x');
        });
    }
    buildDaiLikePermitSignature(params, chainId, tokenName, tokenAddress, version) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const permitData = (0, eip_2612_permit_helper_1.buildPermitTypedData)({
                chainId, tokenName, tokenAddress, params,
                isDomainWithoutVersion: yield this.isDomainWithoutVersion(tokenAddress),
                version,
                permitModelFields: eip_2612_permit_const_1.daiPermitModelFields
            });
            const dataHash = eth_sig_util_1.TypedDataUtils.hashStruct(permitData.primaryType, permitData.message, permitData.types, true).toString('hex');
            return this.connector.signTypedData(params.holder, permitData, dataHash);
        });
    }
    buildDaiLikePermitCallData(permitParams, chainId, tokenName, tokenAddress, version) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const permitSignature = yield this.buildDaiLikePermitSignature(permitParams, chainId, tokenName, tokenAddress, version);
            const permitCallData = this.connector.contractEncodeABI(eip_2612_permit_const_1.DAI_EIP_2612_PERMIT_ABI, tokenAddress, 'permit', (0, eip_2612_permit_helper_1.getDaiPermitContractCallParams)(permitParams, permitSignature));
            return permitCallData.replace(eip_2612_permit_const_1.DAI_PERMIT_SELECTOR, '0x');
        });
    }
    recoverPermitOwnerFromCallData(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { owner } = this.connector.decodeABIParameters(eip_2612_permit_const_1.EIP_2612_PERMIT_INPUTS, params.callData);
            return this.syncRecoverPermitOwnerFromCallData(Object.assign(Object.assign({}, params), { nonce: yield this.getTokenNonce(params.tokenAddress, owner), isDomainWithoutVersion: yield this.isDomainWithoutVersion(params.tokenAddress) }));
        });
    }
    syncRecoverPermitOwnerFromCallData(params) {
        const { callData, chainId, tokenAddress, tokenName, nonce, isDomainWithoutVersion = false, version = undefined } = params;
        const { owner, spender, value, deadline, v, r, s } = this.connector.decodeABIParameters(eip_2612_permit_const_1.EIP_2612_PERMIT_INPUTS, callData);
        const permitParams = { owner, spender, value, deadline, nonce };
        const permitData = (0, eip_2612_permit_helper_1.buildPermitTypedData)({
            chainId,
            tokenName,
            tokenAddress,
            params: permitParams,
            isDomainWithoutVersion,
            version
        });
        return (0, eth_sig_util_1.recoverTypedSignature_v4)({
            data: permitData,
            sig: '0x' + r.slice(2) + s.slice(2) + (+v).toString(16)
        });
    }
    recoverDaiLikePermitOwnerFromCallData(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { holder } = this.connector.decodeABIParameters(eip_2612_permit_const_1.DAI_EIP_2612_PERMIT_INPUTS, params.callData);
            return this.syncRecoverDaiLikePermitOwnerFromCallData(Object.assign(Object.assign({}, params), { nonce: yield this.getTokenNonce(params.tokenAddress, holder), isDomainWithoutVersion: yield this.isDomainWithoutVersion(params.tokenAddress) }));
        });
    }
    syncRecoverDaiLikePermitOwnerFromCallData(params) {
        const { callData, chainId, tokenAddress, tokenName, nonce, isDomainWithoutVersion = false, version = undefined } = params;
        const { holder, spender, value, expiry, allowed, v, r, s } = this.connector.decodeABIParameters(eip_2612_permit_const_1.DAI_EIP_2612_PERMIT_INPUTS, callData);
        const permitParams = { holder, spender, value, expiry, nonce, allowed };
        const permitData = (0, eip_2612_permit_helper_1.buildPermitTypedData)({
            chainId,
            tokenName,
            tokenAddress,
            params: permitParams,
            isDomainWithoutVersion,
            version,
            permitModelFields: eip_2612_permit_const_1.daiPermitModelFields
        });
        return (0, eth_sig_util_1.recoverTypedSignature_v4)({
            data: permitData,
            sig: '0x' + r.slice(2) + s.slice(2) + (+v).toString(16)
        });
    }
    getTokenNonce(tokenAddress, walletAddress) {
        return this.getTokenNonceByMethod('nonces', tokenAddress, walletAddress).catch(() => {
            /**
             * Fallback to _nonces for tokens like:
             * https://polygonscan.com/address/0x3cb4ca3c9dc0e02d252098eebb3871ac7a43c54d
             */
            return this.getTokenNonceByMethod('_nonces', tokenAddress, walletAddress);
        });
    }
    getDomainTypeHash(tokenAddress) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.connector.ethCall(tokenAddress, this.connector.contractEncodeABI(eip_2612_permit_const_1.DOMAIN_TYPEHASH_ABI, tokenAddress, 'DOMAIN_TYPEHASH', []));
            }
            catch (e) {
                return Promise.resolve(null);
            }
        });
    }
    getPermitTypeHash(tokenAddress) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.connector.ethCall(tokenAddress, this.connector.contractEncodeABI(eip_2612_permit_const_1.PERMIT_TYPEHASH_ABI, tokenAddress, 'PERMIT_TYPEHASH', []));
            }
            catch (e) {
                return Promise.resolve(null);
            }
        });
    }
    getDomainSeparator(tokenAddress) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.connector.ethCall(tokenAddress, this.connector.contractEncodeABI(eip_2612_permit_const_1.DOMAIN_SEPARATOR_ABI, tokenAddress, 'DOMAIN_SEPARATOR', []));
        });
    }
    isDomainWithoutVersion(tokenAddress) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const domainTypeHash = yield this.getDomainTypeHash(tokenAddress);
            return !!domainTypeHash && eip_2612_permit_const_1.DOMAINS_WITHOUT_VERSION.includes(domainTypeHash.toLowerCase());
        });
    }
    getTokenNonceByMethod(methodName, tokenAddress, walletAddress) {
        const callData = this.connector.contractEncodeABI(eip_2612_permit_const_1.ERC_20_NONCES_ABI, tokenAddress, methodName, [walletAddress]);
        return this.connector.ethCall(tokenAddress, callData).then((res) => {
            return Number(res);
        });
    }
}
exports.Eip2612PermitUtils = Eip2612PermitUtils;
//# sourceMappingURL=eip-2612-permit.utils.js.map