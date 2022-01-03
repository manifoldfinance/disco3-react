import { initializeConnector } from '@disco3/core';
import { Frame } from '@disco3/frame';

export const [frame, hooks] = initializeConnector<Frame>(
  (actions) => new Frame(actions, undefined, false),
);
