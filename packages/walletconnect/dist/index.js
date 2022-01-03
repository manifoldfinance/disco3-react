import { __awaiter } from "tslib";
import { Connector } from '@disco3/types';
export class WalletConnect extends Connector {
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
            return import('@walletconnect/ethereum-provider').then((m) => {
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
//# sourceMappingURL=index.js.map