/*global System*/

System.config({
    baseURL: 'bundles/aapaapsite/',

    paths: {
        'lib/*': 'js/lib/*.es6',
        'parsing/*': 'js/parsing/*.es6'
    },

    map: {
        underscore: 'vendor/underscore/underscore',
        backbone: 'vendor/backbone/backbone.js'
    },

    transpiler: 'babel'
});