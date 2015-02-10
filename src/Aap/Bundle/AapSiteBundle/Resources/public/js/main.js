/*global require, console*/

require(
    ['config'],
    function() {
    'use strict';

    require(
        ['lib/lang/string', 'lib/lang/function', 'lib/dependencyinjection/container'],
        function (Str, Func, Di) {
            // Str
            console.log(Str.ucfirst('lalal alal alla'));
            console.log(Str.snakeToCamelCase('this_is_snake_style'));
            console.log(Str.spineToCamelCase('this-is-snake-style'));
            console.log(Str.ucfirst('lower'));

            // Func
            var h = Func.cache(function helper() {
                    return (new Date()).getTime();
                });

            console.log(Func.argumentNames(function (a, b, c, foo, bar) {
                console.log('foo');
            }));
            console.log(h());
            window.setTimeout(function () {
                console.log(h());
            }, 500);

            // Di
            var di = new Di();

            di.register('cached-time', function () {
                return (new Date()).getTime();
            }, true);

            di.register('time', function () {
                return (new Date()).getTime();
            }, false);

            console.log('di cached time', di.get('cached-time'));
            console.log('time', di.get('time'));

            window.setTimeout(function () {
                console.log('di cached time', di.get('cached-time'));
                console.log('time', di.get('time'));
            }, 500);
        }
    );
});