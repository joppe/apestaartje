import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@apestaartje/grid': path.resolve(
        __dirname,
        '../../packages/lib/grid/src',
      ),
      '@apestaartje/iterator': path.resolve(
        __dirname,
        '../../packages/lib/iterator/src',
      ),
    },
  },
  plugins: [],
});
