import base from '@apestaartje/jest-config';

export default {
  ...base,
  moduleNameMapper: {
    '@apestaartje/iterator/(.*)': '<rootDir>../../packages/lib/iterator/src/$1',
  },
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: 'jsdom',
};
