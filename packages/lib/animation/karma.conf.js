/* eslint-env node */
module.exports = function (config) {
  const configuration = {
    frameworks: ['jasmine', 'karma-typescript'],

    files: [
      {
        pattern: 'src/**/*.ts',
      },
    ],

    preprocessors: {
      'src/**/*.ts': ['karma-typescript'],
    },

    reporters: ['progress', 'karma-typescript'],

    karmaTypescriptConfig: {
      bundlerOptions: {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        transforms: [require('karma-typescript-es6-transform')()],
      },
      coverageOptions: {
        exclude: [/\.(d|spec|test)\.ts$/i, /node_modules/i],
      },
      include: ['src/**/*.ts'],
      reports: {
        lcovonly: {
          directory: 'coverage',
          subdirectory: 'lcovonly',
          filename: 'lcov.info',
        },
        html: {
          directory: 'coverage',
          subdirectory: 'html',
          filename: 'coverage',
        },
      },
      compilerOptions: {
        module: 'commonjs',
        sourceMap: true,
      },
      exclude: ['../../../node_modules'],
      tsconfig: './tsconfig.json',
    },

    port: 9876,

    colors: true,

    logLevel: config.LOG_WARN,

    autoWatch: false,

    browsers: ['ChromeNoSandboxHeadless'],

    customLaunchers: {
      ChromeNoSandboxHeadless: {
        base: 'Chrome',
        flags: [
          '--no-sandbox',
          '--headless',
          '--disable-gpu',
          '--remote-debugging-port=9222',
        ],
      },
    },

    singleRun: true,
  };

  config.set(configuration);
};
