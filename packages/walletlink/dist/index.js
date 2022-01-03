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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletLink = void 0;
const types_1 = require("@disco3/types");
function parseChainId(chainId) {
    return Number.parseInt(chainId, 16);
}
class WalletLink extends types_1.Connector {
    constructor(actions, options, connectEagerly = true) {
        super(actions);
        this.options = options;
        if (connectEagerly) {
            this.eagerConnection = this.initialize(true);
        }
    }
    initialize(connectEagerly) {
        return __awaiter(this, void 0, void 0, function* () {
            let cancelActivation;
            if (connectEagerly) {
                cancelActivation = this.actions.startActivation();
            }
            const _a = this.options, { url } = _a, options = __rest(_a, ["url"]);
            return Promise.resolve().then(() => __importStar(require('walletlink'))).then((m) => {
                this.walletLink = new m.WalletLink(options);
                this.provider = this.walletLink.makeWeb3Provider(url);
                this.provider.on('connect', ({ chainId }) => {
                    this.actions.update({ chainId: parseChainId(chainId) });
                });
                this.provider.on('disconnect', (error) => {
                    this.actions.reportError(error);
                });
                this.provider.on('chainChanged', (chainId) => {
                    this.actions.update({ chainId: parseChainId(chainId) });
                });
                this.provider.on('accountsChanged', (accounts) => {
                    this.actions.update({ accounts });
                });
                if (connectEagerly) {
                    return Promise.all([
                        this.provider.request({ method: 'eth_chainId' }),
                        this.provider.request({ method: 'eth_accounts' }),
                    ])
                        .then(([chainId, accounts]) => {
                        if (accounts === null || accounts === void 0 ? void 0 : accounts.length) {
                            this.actions.update({ chainId: parseChainId(chainId), accounts });
                        }
                        else {
                            throw new Error('No accounts returned');
                        }
                    })
                        .catch((error) => {
                        console.debug('Could not connect eagerly', error);
                        cancelActivation();
                    });
                }
            });
        });
    }
    activate() {
        return __awaiter(this, void 0, void 0, function* () {
            this.actions.startActivation();
            if (!this.eagerConnection) {
                this.eagerConnection = this.initialize(false);
            }
            yield this.eagerConnection;
            return Promise.all([
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                this.provider.request({ method: 'eth_chainId' }),
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                this.provider.request({ method: 'eth_requestAccounts' }),
            ])
                .then(([chainId, accounts]) => {
                this.actions.update({ chainId: parseChainId(chainId), accounts });
            })
                .catch((error) => {
                this.actions.reportError(error);
            });
        });
    }
    deactivate() {
        if (this.walletLink) {
            this.walletLink.disconnect();
        }
    }
}
exports.WalletLink = WalletLink;
