"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeConnector = void 0;
const providers_1 = require("@ethersproject/providers");
const store_1 = require("@disco3/store");
const react_1 = require("react");
const vanilla_1 = __importDefault(require("zustand/vanilla"));
function initializeConnector(f, allowedChainIds) {
    const [store, actions] = (0, store_1.createWeb3ReactStoreAndActions)(allowedChainIds);
    const connector = f(actions);
    // @ts-ignore
    const useConnector = (0, vanilla_1.default)(store);
    const stateHooks = getStateHooks(useConnector);
    const derivedHooks = getDerivedHooks(stateHooks);
    const augmentedHooks = getAugmentedHooks(connector, stateHooks, derivedHooks);
    return [connector, Object.assign(Object.assign(Object.assign({}, stateHooks), derivedHooks), augmentedHooks)];
}
exports.initializeConnector = initializeConnector;
const CHAIN_ID = (state) => state.chainId;
const ACCOUNTS = (state) => state.accounts;
const ACTIVATING = (state) => state.activating;
const ERROR = (state) => state.error;
function getStateHooks(useConnector) {
    function useChainId() {
        return useConnector(CHAIN_ID);
    }
    function useAccounts() {
        return useConnector(ACCOUNTS);
    }
    function useIsActivating() {
        return useConnector(ACTIVATING);
    }
    function useError() {
        return useConnector(ERROR);
    }
    return { useChainId, useAccounts, useIsActivating, useError };
}
function getDerivedHooks({ useChainId, useAccounts, useIsActivating, useError, }) {
    function useAccount() {
        var _a;
        return (_a = useAccounts()) === null || _a === void 0 ? void 0 : _a[0];
    }
    function useIsActive() {
        const chainId = useChainId();
        const accounts = useAccounts();
        const activating = useIsActivating();
        const error = useError();
        return Boolean(chainId && accounts && !activating && !error);
    }
    return { useAccount, useIsActive };
}
function useENS(provider, accounts) {
    const [ENSNames, setENSNames] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        if (provider && (accounts === null || accounts === void 0 ? void 0 : accounts.length)) {
            let stale = false;
            Promise.all(accounts.map((account) => provider.lookupAddress(account)))
                .then((ENSNames) => {
                if (!stale) {
                    setENSNames(ENSNames);
                }
            })
                .catch((error) => {
                console.debug('Could not fetch ENS names', error);
            });
            return () => {
                stale = true;
                setENSNames(undefined);
            };
        }
    }, [provider, accounts]);
    return ENSNames;
}
function getAugmentedHooks(connector, { useChainId, useAccounts, useError }, { useAccount, useIsActive }) {
    function useProvider(network) {
        const isActive = useIsActive();
        const chainId = useChainId();
        const accounts = useChainId();
        return (0, react_1.useMemo)(() => {
            // we use chainId and accounts to re-render in case connector.provider changes in place
            if (isActive && connector.provider && chainId && accounts) {
                return new providers_1.Web3Provider(connector.provider, network);
            }
        }, [isActive, network, chainId, accounts]);
    }
    function useENSNames(provider) {
        const accounts = useAccounts();
        return useENS(provider, accounts);
    }
    function useENSName(provider) {
        var _a;
        const account = useAccount();
        return (_a = useENS(provider, account === undefined ? undefined : [account])) === null || _a === void 0 ? void 0 : _a[0];
    }
    // for backwards compatibility only
    function useWeb3React(provider) {
        const chainId = useChainId();
        const error = useError();
        const account = useAccount();
        const isActive = useIsActive();
        return {
            connector,
            library: provider,
            chainId,
            account,
            active: isActive,
            error,
        };
    }
    return { useProvider, useENSNames, useENSName, useWeb3React };
}
/** @exports disco3/core */
