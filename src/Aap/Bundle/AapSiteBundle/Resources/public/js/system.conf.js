/*global System*/

System.config({
    baseURL: 'bundles/aapaapsite/',

    paths: {
        'lib/*': 'js/lib/*.es6',
        'bundles/*': 'js/bundles/*.es6',
        'parsing/*': 'js/parsing/*.es6'
    },

    map: {
        jquery: 'vendor/jquery/dist/jquery.js',
        underscore: 'vendor/underscore/underscore',
        backbone: 'vendor/backbone/backbone.js'
    },

    meta: {
        backbone: {
            deps: ['jquery', 'underscore']
        }
    },

    transpiler: 'babel'
});