import { __awaiter, __rest } from "tslib";
import { Connector } from '@disco3/types';
export class Magic extends Connector {
    constructor(actions, options) {
        super(actions);
        this.options = options;
    }
    startListening(configuration) {
        return __awaiter(this, void 0, void 0, function* () {
            const _a = this.options, { apiKey } = _a, options = __rest(_a, ["apiKey"]);
            return import('magic-sdk').then((m) => __awaiter(this, void 0, void 0, function* () {
                this.magic = new m.Magic(apiKey, options);
                yield this.magic.auth.loginWithMagicLink(configuration);
                const [Web3Provider, Eip1193Bridge] = yield Promise.all([
                    import('@ethersproject/providers').then(({ Web3Provider }) => Web3Provider),
                    import('@ethersproject/experimental').then(({ Eip1193Bridge }) => Eip1193Bridge),
                ]);
                const provider = new Web3Provider(this.magic.rpcProvider);
                this.provider = new Eip1193Bridge(provider.getSigner(), provider);
            }));
        });
    }
    activate(configuration) {
        return __awaiter(this, void 0, void 0, function* () {
            this.actions.startActivation();
            yield this.startListening(configuration).catch((error) => {
                this.actions.reportError(error);
            });
            if (this.provider) {
                yield Promise.all([
                    this.provider.request({ method: 'eth_chainId' }),
                    this.provider.request({ method: 'eth_accounts' }),
                ])
                    .then(([chainId, accounts]) => {
                    this.actions.update({ chainId: Number.parseInt(chainId, 16), accounts });
                })
                    .catch((error) => {
                    this.actions.reportError(error);
                });
            }
        });
    }
}
//# sourceMappingURL=index.js.map