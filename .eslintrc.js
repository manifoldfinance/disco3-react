/** @exports eslintConfig */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json', './packages/*/tsconfig.json'],
    ecmaVersion: 8,
    sourceType: "module",
    ecmaFeatures: {
      impliedStrict: true,
      experimentalObjectRestSpread: true
    },
    allowImportExportEverywhere: true
  },
  plugins: [
      "@typescript-eslint",
      "import",
      "react",
      "jest"
      'react-hooks',
      'eslint-plugin-tsdoc'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    "plugin:eslint-comments/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "prettier"
  ],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'tsdoc/syntax': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': "off",
    '@typescript-eslint/no-explicit-any': "off",
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true
  },
    globals: {
    __DEV__: true,
  },
};
