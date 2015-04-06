/*global System*/

System.config({
    baseURL: 'bundles/aapaapsite/js/',

    paths: {
        'lib/*': 'src/lib/*.es6'
    },

    //map: {
    //    jquery: './bower_components/jquery/dist/jquery'
    //},

    transpiler: 'babel'
});