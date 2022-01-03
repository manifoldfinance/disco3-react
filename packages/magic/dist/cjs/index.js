"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Magic = void 0;
const tslib_1 = require("tslib");
const types_1 = require("@disco3/types");
class Magic extends types_1.Connector {
    constructor(actions, options) {
        super(actions);
        this.options = options;
    }
    startListening(configuration) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const _a = this.options, { apiKey } = _a, options = tslib_1.__rest(_a, ["apiKey"]);
            return Promise.resolve().then(() => tslib_1.__importStar(require('magic-sdk'))).then((m) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                this.magic = new m.Magic(apiKey, options);
                yield this.magic.auth.loginWithMagicLink(configuration);
                const [Web3Provider, Eip1193Bridge] = yield Promise.all([
                    Promise.resolve().then(() => tslib_1.__importStar(require('@ethersproject/providers'))).then(({ Web3Provider }) => Web3Provider),
                    Promise.resolve().then(() => tslib_1.__importStar(require('@ethersproject/experimental'))).then(({ Eip1193Bridge }) => Eip1193Bridge),
                ]);
                const provider = new Web3Provider(this.magic.rpcProvider);
                this.provider = new Eip1193Bridge(provider.getSigner(), provider);
            }));
        });
    }
    activate(configuration) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
exports.Magic = Magic;
//# sourceMappingURL=index.js.map