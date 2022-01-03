"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Network = void 0;
const types_1 = require("@disco3/types");
class Network extends types_1.Connector {
    constructor(actions, urlMap, connectEagerly = true) {
        super(actions);
        this.providerCache = {};
        this.urlMap = Object.keys(urlMap).reduce((accumulator, chainId) => {
            const urls = urlMap[Number(chainId)];
            accumulator[Number(chainId)] = Array.isArray(urls) ? urls : [urls];
            return accumulator;
        }, {});
        // use the first chainId in urlMap as the default
        this.chainId = Number(Object.keys(this.urlMap)[0]);
        if (connectEagerly) {
            void this.initialize();
        }
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            this.actions.startActivation();
            // cache the desired chainId before async logic
            const chainId = this.chainId;
            // populate the provider cache if necessary
            if (!this.providerCache[chainId]) {
                // instantiate new provider
                const [{ JsonRpcProvider, FallbackProvider }, Eip1193Bridge] = yield Promise.all([
                    Promise.resolve().then(() => __importStar(require('@ethersproject/providers'))).then(({ JsonRpcProvider, FallbackProvider }) => ({
                        JsonRpcProvider,
                        FallbackProvider,
                    })),
                    Promise.resolve().then(() => __importStar(require('@ethersproject/experimental'))).then(({ Eip1193Bridge }) => Eip1193Bridge),
                ]);
                const urls = this.urlMap[chainId];
                const providers = urls.map((url) => new JsonRpcProvider(url, chainId));
                const provider = new Eip1193Bridge(providers[0].getSigner(), providers.length === 1 ? providers[0] : new FallbackProvider(providers));
                this.providerCache[chainId] = provider;
            }
            // once we're here, the cache is guaranteed to be initialized
            // so, if the current chainId still matches the one at the beginning of the call, update
            if (chainId === this.chainId) {
                const provider = this.providerCache[chainId];
                return provider
                    .request({ method: 'eth_chainId' })
                    .then((returnedChainId) => {
                    if (returnedChainId !== chainId) {
                        // this means the returned chainId was unexpected, i.e. the provided url(s) were wrong
                        throw new Error(`expected chainId ${chainId}, received ${returnedChainId}`);
                    }
                    // again we have to make sure the chainIds match, to prevent race conditions
                    if (chainId === this.chainId) {
                        this.actions.update({ chainId, accounts: [] });
                    }
                })
                    .catch((error) => {
                    this.actions.reportError(error);
                });
            }
        });
    }
    activate(desiredChainId = Number(Object.keys(this.urlMap)[0])) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.urlMap[desiredChainId] === undefined) {
                throw new Error(`no url(s) provided for desiredChainId ${desiredChainId}`);
            }
            // set the connector's chainId to the target, to prevent race conditions
            this.chainId = desiredChainId;
            return this.initialize();
        });
    }
}
exports.Network = Network;
