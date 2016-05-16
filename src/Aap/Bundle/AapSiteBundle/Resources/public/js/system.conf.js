/*global System*/

System.config({
    baseURL: 'bundles/aapaapsite/',

    defaultJSExtensions: true,

    paths: {
        'app/*': 'js/app/*.js',
        'lib/*': 'js/lib/*.js',
        'bundles/*': 'js/bundles/*.js',
        'framework/*': 'js/framework/*.js',
        'parsing/*': 'js/parsing/*.js'
    },

    map: {
        jquery: 'vendor/jquery/dist/jquery',
        underscore: 'vendor/underscore/underscore',
        backbone: 'vendor/backbone/backbone'
    },

    meta: {
        backbone: {
            deps: ['jquery', 'underscore']
        }
    }
});