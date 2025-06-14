import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@apestaartje/element': path.resolve(
        __dirname,
        '../../packages/lib/element/src',
      ),
      '@apestaartje/iterator': path.resolve(
        __dirname,
        '../../packages/lib/iterator/src',
      ),
    },
  },
  plugins: [],
});
