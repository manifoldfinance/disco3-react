'use strict';
/**
 * @file browserslist configuration
 * @version 2022.01
 * @license ISC
 */


/** @exports browserslistrc */
module.exports = {
  'production': [
    '>0.3%',
    'not dead',
    'not op_mini all',
    'not IE > 0',
    'not samsung 4',
    'not and_uc 12.12'
  ],
  "development": [
    'last 1 chrome version',
    'last 1 firefox version',
    'last 1 edge version',
    'last 1 safari version'
  ]
};

/** @example */
/**  ['>0.3%', 'not dead', 'not op_mini all', 'not IE > 0'];
npx browserslist ">0.3%, not dead, not op_mini all, not IE > 0"
and_chr 89
and_uc 12.12
chrome 88
chrome 87
chrome 86
edge 88
firefox 85
ios_saf 14.0-14.5
ios_saf 13.4-13.7
ios_saf 12.2-12.4
opera 73
safari 14
safari 13.1
samsung 13.0
*/
