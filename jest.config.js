module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@disco3/(.*)$': '<rootDir>/packages/$1/src',
  },
testPathIgnorePatterns: [
'<rootDir>/packages/network',
'<rootDir>/packages/url',
'<rootDir>/packages/components',
]
}
