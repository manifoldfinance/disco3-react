import { globalStyle } from '@vanilla-extract/css';
import { vars } from 'disco-web3/css';
import type { vars } from '/disco-web3/dist/types/css/vars.css.d.ts';
import { tokens } from 'disco-web3/css';

globalStyle('.npm__react-simple-code-editor__textarea', {
  fontFamily: vars.fonts.mono + ' !important',
  fontSize: vars.fontSizes.base + ' !important',
  padding: vars.space['6'] + ' !important',
  paddingRight: vars.space['14'] + ' !important',
});

globalStyle('.npm__react-simple-code-editor__textarea:focus-visible', {
  outline: 'none',
});

globalStyle('.npm__react-simple-code-editor__textarea + pre', {
  fontFamily: vars.fonts.mono + ' !important',
  fontSize: vars.fontSizes.base + ' !important',
  padding: vars.space['6'] + ' !important',
  paddingRight: vars.space['14'] + ' !important',
});
