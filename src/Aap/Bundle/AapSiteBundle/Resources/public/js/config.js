/*global require*/

require.config({
    urlArgs: 'bust=' +  (new Date()).getTime(),
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        underscore: '../bower_components/underscore/underscore',
        backbone: '../bower_components/backbone/backbone'
    },
    shim: {
        backbone: ['jquery', 'underscore']
    }
});