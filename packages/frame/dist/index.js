import { __awaiter } from "tslib";
import { Connector } from '@disco3/types';
export class NoFrameError extends Error {
    constructor() {
        super('Frame not installed');
        this.name = NoFrameError.name;
        Object.setPrototypeOf(this, NoFrameError.prototype);
    }
}
function parseChainId(chainId) {
    return Number.parseInt(chainId, 16);
}
export class Frame extends Connector {
    constructor(actions, options, connectEagerly = true) {
        super(actions);
        this.options = options;
        if (connectEagerly) {
            this.providerPromise = this.startListening(connectEagerly);
        }
    }
    startListening(connectEagerly) {
        return __awaiter(this, void 0, void 0, function* () {
            const ethProvider = yield import('eth-provider').then((m) => m.default);
            try {
                this.provider = ethProvider('frame', this.options);
            }
            catch (error) {
                this.actions.reportError(error);
            }
            if (this.provider) {
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
                        if ((accounts === null || accounts === void 0 ? void 0 : accounts.length) > 0) {
                            this.actions.update({ chainId: parseChainId(chainId), accounts });
                        }
                    })
                        .catch((error) => {
                        console.debug('Could not connect eagerly', error);
                    });
                }
            }
        });
    }
    activate() {
        return __awaiter(this, void 0, void 0, function* () {
            this.actions.startActivation();
            if (!this.providerPromise) {
                this.providerPromise = this.startListening(false);
            }
            yield this.providerPromise;
            if (this.provider) {
                yield Promise.all([
                    this.provider.request({ method: 'eth_chainId' }),
                    this.provider.request({ method: 'eth_requestAccounts' }),
                ])
                    .then(([chainId, accounts]) => {
                    this.actions.update({ chainId: parseChainId(chainId), accounts });
                })
                    .catch((error) => {
                    this.actions.reportError(error);
                });
            }
            else {
                this.actions.reportError(new NoFrameError());
            }
        });
    }
}
//# sourceMappingURL=index.js.map