const fs = require('fs');
const path = require('path');
const { mergeConfig } = require('vite');

// read tsconfig.json
const tsconfig = require('@apestaartje/ts-config/base.json');

// get the alias mapping
const alias = Object.keys(tsconfig.compilerOptions.paths).reduce((acc, key) => {
  const value = tsconfig.compilerOptions.paths[key][0];

  acc[key.replace('/*', '')] = path.resolve(
    __dirname,
    `../../../${value.replace('/*', '')}`,
  );

  return acc;
}, {});

/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias,
      },
    });
  },
};

export default config;
