'use strict';

// @ts-check
/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: ['packages/**/*.{ts,tsx}'],
  moduleNameMapper: {
    '^@disco3/(.*)$': '<rootDir>/packages/$1/src',
  },
testPathIgnorePatterns: [
'<rootDir>/packages/network',
'<rootDir>/packages/url',
'<rootDir>/packages/components',
]
}
