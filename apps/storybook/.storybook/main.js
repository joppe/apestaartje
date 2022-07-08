const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: 'storybook-addon-swc',
      options: {
        enable: true,
        swcLoaderOptions: {
          jsc: {
            parser: {
              syntax: 'typescript',
              decorators: true,
            },
          },
        },
      },
    },
  ],
  framework: '@storybook/html',
  webpackFinal: async (config, { configType }) => {
    config.resolve.plugins = [new TsconfigPathsPlugin()];

    return config;
  },
};
