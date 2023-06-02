/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const path = require('path');

const rootPath = path.resolve(__dirname, '../../../../');
const targetPath = path.join(rootPath, 'packages/lib');
const packages = fs.readdirSync(targetPath);

function getJSON(filePath) {
  return JSON.parse(fs.readFileSync(filePath));
}

const paths = packages.reduce((acc, pgk) => {
  const packagePath = path.join(targetPath, pgk);
  const packageJson = getJSON(path.join(packagePath, 'package.json'));
  const packageName = packageJson.name;

  acc[`${packageName}/(.*)`] = `<rootDir>..${packagePath.replace(
    targetPath,
    '',
  )}/src/$1`;

  return acc;
}, {});

fs.writeFileSync(
  path.join(__dirname, '..', 'moduleNameMapper.json'),
  JSON.stringify(paths, null, 2),
);
