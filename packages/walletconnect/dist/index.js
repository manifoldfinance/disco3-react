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
exports.WalletConnect = void 0;
const types_1 = require("@disco3/types");
class WalletConnect extends types_1.Connector {
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
            return Promise.resolve().then(() => __importStar(require('@walletconnect/ethereum-provider'))).then((m) => {
                this.provider = new m.default(this.options);
                this.provider.on('disconnect', (error) => {
                    this.actions.reportError(error);
                });
                this.provider.on('chainChanged', (chainId) => {
                    this.actions.update({ chainId });
                });
                this.provider.on('accountsChanged', (accounts) => {
                    this.actions.update({ accounts });
                });
                if (connectEagerly) {
                    if (this.provider.connected) {
                        return Promise.all([
                            this.provider.request({ method: 'eth_chainId' }),
                            this.provider.request({ method: 'eth_accounts' }),
                        ])
                            .then(([chainId, accounts]) => {
                            if (accounts === null || accounts === void 0 ? void 0 : accounts.length) {
                                this.actions.update({ chainId, accounts });
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
                    else {
                        cancelActivation();
                    }
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
                this.actions.update({ chainId, accounts });
            })
                .catch((error) => {
                this.actions.reportError(error);
            });
        });
    }
    deactivate() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.provider) {
                return this.provider.disconnect();
            }
        });
    }
}
exports.WalletConnect = WalletConnect;
