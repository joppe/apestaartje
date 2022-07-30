/* eslint-env node */

module.exports = {
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '@apestaartje/geometry/(.*)': '<rootDir>../geometry/src/$1',
    '@apestaartje/types/(.*)': '<rootDir>../types/src/$1',
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: 'jsdom',
};
