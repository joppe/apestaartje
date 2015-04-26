/*global System*/

System.config({
    baseURL: 'bundles/aapaapsite/',

    paths: {
        'app/*': 'js/app/*.js',
        'lib/*': 'js/lib/*.js',
        'bundles/*': 'js/bundles/*.js',
        'framework/*': 'js/framework/*.js',
        'parsing/*': 'js/parsing/*.js'
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