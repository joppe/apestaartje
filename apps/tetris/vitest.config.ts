import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, mergeConfig } from 'vitest/config';

import baseConfig from '@apestaartje/vitest-config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
    resolve: {
      alias: [
        {
          find: /^@apestaartje\/geometry\/(.*)$/,
          replacement: path.resolve(
            __dirname,
            '../../packages/lib/geometry/src/$1',
          ),
        },
        {
          find: /^@apestaartje\/array\/(.*)$/,
          replacement: path.resolve(
            __dirname,
            '../../packages/lib/array/src/$1',
          ),
        },
      ],
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
  }),
);
