/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const path = require('path');

const moduleNameMapper = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'moduleNameMapper.json'), 'utf8'),
);

module.exports = {
  moduleNameMapper,
  preset: 'ts-jest',
};
