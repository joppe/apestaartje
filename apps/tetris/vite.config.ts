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
      '@apestaartje/color': path.resolve(
        __dirname,
        '../../packages/lib/color/src',
      ),
      '@apestaartje/dependency-injection': path.resolve(
        __dirname,
        '../../packages/lib/dependency-injection/src',
      ),
      '@apestaartje/dom': path.resolve(__dirname, '../../packages/lib/dom/src'),
      '@apestaartje/element': path.resolve(
        __dirname,
        '../../packages/lib/element/src',
      ),
      '@apestaartje/finite-state-machine': path.resolve(
        __dirname,
        '../../packages/lib/finite-state-machine/src',
      ),
      '@apestaartje/function': path.resolve(
        __dirname,
        '../../packages/lib/function/src',
      ),
      '@apestaartje/geometry': path.resolve(
        __dirname,
        '../../packages/lib/geometry/src',
      ),
      '@apestaartje/iterator': path.resolve(
        __dirname,
        '../../packages/lib/iterator/src',
      ),
      '@apestaartje/number': path.resolve(
        __dirname,
        '../../packages/lib/number/src',
      ),
      '@apestaartje/observable': path.resolve(
        __dirname,
        '../../packages/lib/observable/src',
      ),
      '@apestaartje/store': path.resolve(
        __dirname,
        '../../packages/lib/store/src',
      ),
    },
  },
  plugins: [],
});
