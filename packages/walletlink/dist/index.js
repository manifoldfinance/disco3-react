import { __awaiter, __rest } from "tslib";
import { Connector } from '@disco3/types';
function parseChainId(chainId) {
    return Number.parseInt(chainId, 16);
}
export class WalletLink extends Connector {
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
            return import('walletlink').then((m) => {
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
//# sourceMappingURL=index.js.map