import { __awaiter } from "tslib";
import { Connector } from '@disco3/types';
export class Empty extends Connector {
    constructor(actions) {
        super(actions);
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    activate() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
//# sourceMappingURL=index.js.map