"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Empty = void 0;
const tslib_1 = require("tslib");
const types_1 = require("@disco3/types");
class Empty extends types_1.Connector {
    constructor(actions) {
        super(actions);
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    activate() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () { });
    }
}
exports.Empty = Empty;
//# sourceMappingURL=index.js.map