import type { Actions } from '@disco3/types';
import { Connector } from '@disco3/types';
export declare class Empty extends Connector {
    constructor(actions: Actions);
    activate(): Promise<void>;
}
