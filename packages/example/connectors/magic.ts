import { initializeConnector } from '@disco3/core';
import { Magic } from '@disco3/magic';

export const [magic, hooks] = initializeConnector<Magic>(
  (actions) =>
    new Magic(actions, {
      apiKey: process.env.magicKey,
    }),
);
