/*global require*/

require(
    ['config'],
    function() {
    'use strict';

    require(
        ['lib/lang/string', 'lib/lang/function'],
        function (Str, Func) {
            // Str
            console.log(Str.ucfirst('lalal alal alla'));
            console.log(Str.snakeToCamelCase('this_is_snake_style'));
            console.log(Str.spineToCamelCase('this-is-snake-style'));
            console.log(Str.ucfirst('lower'));

            // Func
            var h = Func.cache(function helper() {
                    return (new Date()).getTime();
                });

            console.log(h());
            window.setTimeout(function () {
                console.log(h());
            }, 500);
            console.log(Func.arguments(function (a, b, c, foo, bar) {
                console.log('foo');
            }));
        }
    );
});