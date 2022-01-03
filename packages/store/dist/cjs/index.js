"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWeb3ReactStoreAndActions = exports.ChainIdNotAllowedError = void 0;
const tslib_1 = require("tslib");
const address_1 = require("@ethersproject/address");
const vanilla_1 = (0, tslib_1.__importDefault)(require("zustand/vanilla"));
function validateChainId(chainId) {
    if (!Number.isInteger(chainId) || chainId <= 0 || chainId > Number.MAX_SAFE_INTEGER) {
        throw new Error(`Invalid chainId ${chainId}`);
    }
}
class ChainIdNotAllowedError extends Error {
    constructor(chainId, allowedChainIds) {
        super(`chainId ${chainId} not included in ${allowedChainIds.toString()}`);
        this.name = ChainIdNotAllowedError.name;
        Object.setPrototypeOf(this, ChainIdNotAllowedError.prototype);
    }
}
exports.ChainIdNotAllowedError = ChainIdNotAllowedError;
function ensureChainIdIsAllowed(chainId, allowedChainIds) {
    return allowedChainIds.some((allowedChainId) => chainId === allowedChainId)
        ? undefined
        : new ChainIdNotAllowedError(chainId, allowedChainIds);
}
function validateAccount(account) {
    return (0, address_1.getAddress)(account);
}
const DEFAULT_STATE = {
    chainId: undefined,
    accounts: undefined,
    activating: false,
    error: undefined,
};
function createWeb3ReactStoreAndActions(allowedChainIds) {
    if ((allowedChainIds === null || allowedChainIds === void 0 ? void 0 : allowedChainIds.length) === 0) {
        throw new Error(`allowedChainIds is length 0`);
    }
    const store = (0, vanilla_1.default)(() => DEFAULT_STATE);
    // flag for tracking updates so we don't clobber data when cancelling activation
    let nullifier = 0;
    function startActivation() {
        const nullifierCached = ++nullifier;
        store.setState({ ...DEFAULT_STATE, activating: true });
        // return a function that cancels the activation iff nothing else has happened
        return () => {
            if (nullifier === nullifierCached) {
                store.setState({ ...DEFAULT_STATE, activating: false });
            }
        };
    }
    function update(stateUpdate) {
        // validate chainId statically, independent of existing state
        if (stateUpdate.chainId !== undefined) {
            validateChainId(stateUpdate.chainId);
        }
        // validate accounts statically, independent of existing state
        if (stateUpdate.accounts !== undefined) {
            for (let i = 0; i < stateUpdate.accounts.length; i++) {
                // Non-null assertion operator
                stateUpdate.accounts[i] = validateAccount(stateUpdate.accounts[i]);
            }
        }
        nullifier++;
        store.setState((existingState) => {
            var _a, _b;
            // determine the next chainId and accounts
            const chainId = (_a = stateUpdate.chainId) !== null && _a !== void 0 ? _a : existingState.chainId;
            const accounts = (_b = stateUpdate.accounts) !== null && _b !== void 0 ? _b : existingState.accounts;
            // determine the next error
            let error = existingState.error;
            if (chainId && allowedChainIds) {
                // if we have a chainId allowlist and a chainId, we need to ensure it's allowed
                const chainIdError = ensureChainIdIsAllowed(chainId, allowedChainIds);
                // warn if we're going to clobber existing error
                if (chainIdError && error) {
                    console.debug(`${error.name} is being clobbered by ${chainIdError.name}`);
                }
                error = chainIdError;
            }
            // ensure that the error is cleared when appropriate
            if (error && !(error instanceof ChainIdNotAllowedError) && chainId && accounts) {
                error = undefined;
            }
            // ensure that the activating flag is cleared when appropriate
            let activating = existingState.activating;
            if (activating && (error || (chainId && accounts))) {
                activating = false;
            }
            return { chainId, accounts, activating, error };
        });
    }
    function reportError(error) {
        nullifier++;
        store.setState(() => ({ ...DEFAULT_STATE, error }));
    }
    // @ts-ignore
    return [store, { startActivation, update, reportError }];
}
exports.createWeb3ReactStoreAndActions = createWeb3ReactStoreAndActions;
//# sourceMappingURL=index.js.map