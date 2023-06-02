/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const path = require('path');

const rootPath = path.resolve(__dirname, '../../../../');
const libPath = path.join(rootPath, 'packages/lib');
const appPath = path.join(rootPath, 'apps');

function getJSON(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function getPaths(searchPath) {
  const packages = fs.readdirSync(searchPath);

  return packages.reduce((acc, pgk) => {
    const packagePath = path.join(searchPath, pgk);
    const packageJson = getJSON(path.join(packagePath, 'package.json'));
    const packageName = packageJson.name;

    acc[`${packageName}/*`] = [
      `${packagePath.replace(`${rootPath}/`, '')}/src/*`,
    ];

    return acc;
  }, {});
}

const template = getJSON(path.join(__dirname, 'template.json'));

template.compilerOptions.paths = {
  ...getPaths(libPath),
  ...getPaths(appPath),
};

fs.writeFileSync(
  path.join(__dirname, '..', 'base.json'),
  JSON.stringify(template, null, 2),
);
