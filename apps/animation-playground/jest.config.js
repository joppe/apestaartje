import base from '@apestaartje/jest-config';

export default {
  ...base,
  moduleNameMapper: {
    '@apestaartje/geometry/(.*)': '<rootDir>../../packages/lib/geometry/src/$1',
    '@apestaartje/array/(.*)': '<rootDir>../../packages/lib/array/src/$1',
  },
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: 'jsdom',
};
