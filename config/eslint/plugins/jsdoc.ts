'use strict';

module.exports = {
  plugins: ['jsdoc'],
  settings: {
    jsdoc: {
      tagNamePreference: {
        augments: 'extends',
      },
    },
  },
  rules: {
    'jsdoc/check-param-names': 2,
    'jsdoc/check-tag-names': [
      'error',
      {
        definedTags: ['jest-environment'],
      },
    ],
    'jsdoc/check-types': 2,
  },
};
