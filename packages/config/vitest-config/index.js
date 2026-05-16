import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const moduleNameMapper = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'moduleNameMapper.json'), 'utf8'),
);

// Convert Jest moduleNameMapper to Vitest alias format
const alias = Object.entries(moduleNameMapper).reduce((acc, [key, value]) => {
  // Remove (.*) from the key and convert <rootDir>../path/src/$1 to absolute path
  // Add trailing slash to support deep imports
  const aliasKey = key.replace('/(.*)', '/');
  const aliasValue = value
    .replace('<rootDir>..', path.join(__dirname, '../../lib'))
    .replace('/src/$1', '/src/');
  acc[aliasKey] = aliasValue;
  return acc;
}, {});

const config = {
  test: {
    globals: true,
    environment: 'node',
  },
  resolve: {
    alias,
  },
};

export default config;
