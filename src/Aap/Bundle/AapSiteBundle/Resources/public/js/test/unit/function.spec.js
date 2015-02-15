/*global define, describe, jasmine, it, expect*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    ['lib/lang/function'],
    function (Func) {
        'use strict';

        describe('function tests', function () {

            it('argumentNames', function () {
                expect(Func.argumentNames(function (a, b, c, foo, bar) {})).toEqual(['a', 'b', 'c', 'foo', 'bar']);
            });

        });

    }
);