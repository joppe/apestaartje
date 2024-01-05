/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const base = require('@apestaartje/jest-config');

module.exports = {
  ...base,
  moduleNameMapper: {
    '@apestaartje/iterator/(.*)': '<rootDir>../../packages/lib/iterator/src/$1',
  },
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: 'jsdom',
};
