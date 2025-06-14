import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const moduleNameMapper = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'moduleNameMapper.json'), 'utf8'),
);

const config = {
  moduleNameMapper,
  preset: 'ts-jest',
};

export default config;
