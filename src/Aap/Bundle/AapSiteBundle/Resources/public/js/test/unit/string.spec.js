/*global define, describe, it, expect*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    ['lib/lang/string'],
    function (Str) {
        'use strict';

        describe('string tests', function () {

            it('ltrim', function () {
                expect(Str.ltrim('  foo  ')).toBe('foo  ');
            });

            it('rtrim', function () {
                expect(Str.rtrim('  foo  ')).toBe('  foo');
            });

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

            it ('pad left', function () {
                expect(Str.pad('1', 4, 0, Str.pad.PAD_LEFT)).toBe('0001');
            });

            it ('pad right', function () {
                expect(Str.pad('1', 4, 0, Str.PAD_RIGHT)).toBe('1000');
            });

        });

    }
);