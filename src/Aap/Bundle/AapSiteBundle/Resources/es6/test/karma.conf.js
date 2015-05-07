/*jshint strict: false*/
/*global module*/

// Karma configuration
// Generated on Thu Feb 12 2015 22:12:00 GMT+0100 (CET)

module.exports = function (config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '../',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: [
            'systemjs',
            'jasmine'
        ],


        // list of files / patterns to load in the browser
        files: [],


        // systemjs config
        systemjs: {
            configFile: '../public/js/system.conf.js',

            files: [
                'test/vendor/jquery/dist/jquery.js',
                'test/vendor/underscore/underscore.js',
                'test/vendor/backbone/backbone.js',
                'src/**/*.es6',
                'test/unit/**/*.spec.js'
            ],

            config: {
                baseURL: './',

                paths: {
                    'babel': 'test/node_modules/babel-core/browser.js',
                    'app/*': 'src/app/*.es6',
                    'lib/*': 'src/lib/*.es6',
                    'bundles/*': 'src/bundles/*.es6',
                    'framework/*': 'src/framework/*.es6',
                    'parsing/*': 'src/parsing/*.es6'
                },

                map: {
                    jquery: 'test/vendor/jquery/dist/jquery',
                    underscore: 'test/vendor/underscore/underscore',
                    backbone: 'test/vendor/backbone/backbone'
                }
            },

            // systemjs does not support other extensions then .js for test files
            testFileSuffix: '.spec.js'
        },


        plugins : [
            'karma-systemjs',
            'karma-jasmine',
            'karma-chrome-launcher'
        ],


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'dots'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};