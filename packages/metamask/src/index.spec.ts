import { createWeb3ReactStateAndActions } from '@disco3/store';
import { Actions, Web3ReactState } from '@disco3/types';
import { MetaMask } from '.';
import { MockEIP1193Provider } from '../../eip1193/src/index.spec';

describe('MetaMask', () => {
  let mockProvider: MockEIP1193Provider;

  beforeEach(() => {
    mockProvider = new MockEIP1193Provider();
  });

  let store: Web3ReactState;
  let connector: MetaMask;

  describe('#activate', () => {
    beforeEach(() => {
      let actions: Actions;
      [store, actions] = createWeb3ReactStateAndActions();
      connector = new MetaMask(actions, false);
    });

    beforeEach(() => {
      (window as any).ethereum = mockProvider;
    });

    describe('#activate', () => {
      test('works', async () => {
        const chainId = '0x1';
        const accounts: string[] = [];

        mockProvider.chainId = chainId;
        mockProvider.accounts = accounts;

        await connector.activate();

        expect(store.getState()).toEqual({
          chainId: 1,
          accounts,
          activating: false,
          error: undefined,
        });
      });
    });
  });
});
