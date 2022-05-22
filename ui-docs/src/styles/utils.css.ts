import { atoms, vars } from '@disco3/componentscss';

import { style } from '@vanilla-extract/css';

export const hoverParent = style({});

export const hoverChild = style({
  visibility: 'hidden',
  selectors: {
    [`${hoverParent}:hover &`]: {
      visibility: 'visible',
    },
  },
});

export const link = style([
  atoms({
    color: 'accent',
    cursor: 'pointer',
  }),
  style({
    textDecoration: 'underline',
    textDecorationColor: vars.colors.accent,
    textUnderlineOffset: '0.2em',
  }),
]);

export const list = style({
  overflow: 'scroll',
});
