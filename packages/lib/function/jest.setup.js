/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const crypto = require('crypto');

Object.defineProperty(global.self, 'crypto', {
  value: {
    getRandomValues: (arr) => crypto.randomFillSync(arr),
  },
});
