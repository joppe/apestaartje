/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const base = require('@apestaartje/jest-config');

module.exports = {
  ...base,
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: 'jsdom',
};
