import type { Actions } from '@disco3/types';
import { Connector } from '@disco3/types';

export class Empty extends Connector {
  constructor(actions: Actions) {
    super(actions);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async activate(): Promise<void> {}
}
