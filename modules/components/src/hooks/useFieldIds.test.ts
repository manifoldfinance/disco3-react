import { cleanup, renderHook } from '@/test';

import { useFieldIds } from './useFieldIds';

const noArgs = {
  content: {
    'aria-describedby': undefined,
    'aria-labelledby': '@disco3/components1-label',
    'id': '@disco3/components1',
  },
  description: undefined,
  error: undefined,
  label: {
    htmlFor: '@disco3/components1',
    id: '@disco3/components1-label',
  },
};

const withId = {
  content: {
    'aria-describedby': undefined,
    'aria-labelledby': '@disco3/components2-address-label',
    'id': '@disco3/components2-address',
  },
  description: undefined,
  error: undefined,
  label: {
    htmlFor: '@disco3/components2-address',
    id: '@disco3/components2-address-label',
  },
};

const withDescription = {
  content: {
    'aria-describedby': '@disco3/components3-description',
    'aria-labelledby': '@disco3/components3-label',
    'id': '@disco3/components3',
  },
  description: {
    id: '@disco3/components3-description',
  },
  error: undefined,
  label: {
    htmlFor: '@disco3/components3',
    id: '@disco3/components3-label',
  },
};

const withError = {
  content: {
    'aria-describedby': '@disco3/components4-error',
    'aria-labelledby': '@disco3/components4-label',
    'id': '@disco3/components4',
  },
  description: undefined,
  error: {
    id: '@disco3/components4-error',
  },
  label: {
    htmlFor: '@disco3/components4',
    id: '@disco3/components4-label',
  },
};

const withDescriptionAndError = {
  content: {
    'aria-describedby': '@disco3/components5-description @disco3/components5-error',
    'aria-labelledby': '@disco3/components5-label',
    'id': '@disco3/components5',
  },
  description: {
    id: '@disco3/components5-description',
  },
  error: {
    id: '@disco3/components5-error',
  },
  label: {
    htmlFor: '@disco3/components5',
    id: '@disco3/components5-label',
  },
};

describe.each`
  args                                  | expected
  ${undefined}                          | ${noArgs}
  ${{ id: 'address' }}                  | ${withId}
  ${{ description: true }}              | ${withDescription}
  ${{ error: true }}                    | ${withError}
  ${{ description: true, error: true }} | ${withDescriptionAndError}
`('useFieldIds($args)', ({ args, expected }) => {
  afterEach(cleanup);

  it(`returns ${JSON.stringify(expected)}`, () => {
    const { result } = renderHook(() => useFieldIds(args));
    expect(result.current).toStrictEqual(expected);
  });
});
