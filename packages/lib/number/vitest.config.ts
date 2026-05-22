import { defineConfig, mergeConfig } from 'vitest/config';

import baseConfig from '@apestaartje/vitest-config';

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
      },
      setupFiles: ['./vitest.setup.ts'],
    },
  }),
);
