/*global define, describe, jasmine, it, expect*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    ['lib/lang/string'],
    function (Str) {
        'use strict';

        describe('string tests', function () {

            it('trim', function () {
                expect(Str.trim('  foo  ')).toBe('foo');
            });

            it('snake to camelcase', function () {
                expect(Str.snakeToCamelCase('snake_styled_var_name')).toBe('snakeStyledVarName');
            });

            it('spine to camelcase', function () {
                expect(Str.spineToCamelCase('spine-styled-var-name')).toBe('spineStyledVarName');
            });

            it ('ucfirst', function () {
                expect(Str.ucfirst('are you sure?')).toBe('Are you sure?');
            });

        });

    }
);