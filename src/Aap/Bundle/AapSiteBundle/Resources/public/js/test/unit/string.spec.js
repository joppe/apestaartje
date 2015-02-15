/*global define, describe, jasmine, it, expect*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    ['lib/lang/string'],
    function (Str) {
        'use strict';

        describe('string.js', function () {

            it('trim', function () {
                expect(Str.trim('  foo  ')).toEqual('foo');
            });

            it('snake to camelcase', function () {
                expect(Str.snakeToCamelCase('snake_styled_var_name')).toEqual('snakeStyledVarName');
            });

            it('spine to camelcase', function () {
                expect(Str.spineToCamelCase('spine-styled-var-name')).toEqual('spineStyledVarName');
            });

            it ('ucfirst', function () {
                expect(Str.ucfirst('are you sure?')).toEqual('Are you sure?');
            });

        });

    }
);