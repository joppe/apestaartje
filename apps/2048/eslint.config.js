import { defineConfig } from 'eslint/config';

import config from '@apestaartje/eslint-config';

export default defineConfig([
  {
    files: ['**/*.ts'],
    extends: [config],
  },
]);
