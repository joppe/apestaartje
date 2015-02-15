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

            it('get argument names', function () {
                expect(Func.argumentNames(function (a, b, c, foo, bar) {})).toEqual(['a', 'b', 'c', 'foo', 'bar']);
            });

            it('get no argument names, when none defined', function () {
                expect(Func.argumentNames(function () {})).toEqual([]);
            });

            it('cache function', function () {
                var h = Func.cache(function helper() {
                        return (new Date()).getTime();
                    }),
                    t = h();

                setTimeout(function () {
                    expect(h()).toEqual(t);
                }, 200);
            });

        });

    }
);