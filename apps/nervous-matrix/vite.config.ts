import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@apestaartje/animation': path.resolve(
        __dirname,
        '../../packages/lib/animation/src',
      ),
      '@apestaartje/array': path.resolve(
        __dirname,
        '../../packages/lib/array/src',
      ),
      '@apestaartje/dom': path.resolve(__dirname, '../../packages/lib/dom/src'),
      '@apestaartje/geometry': path.resolve(
        __dirname,
        '../../packages/lib/geometry/src',
      ),
      '@apestaartje/number': path.resolve(
        __dirname,
        '../../packages/lib/number/src',
      ),
      '@apestaartje/physics': path.resolve(
        __dirname,
        '../../packages/lib/physics/src',
      ),
    },
  },
  plugins: [],
});
