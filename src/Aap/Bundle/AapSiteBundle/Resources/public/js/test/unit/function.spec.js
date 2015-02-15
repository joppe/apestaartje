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

            describe('argumentNames', function () {

                it('should get arguments of an anonymous function', function () {
                    expect(Func.argumentNames(function (a, b, c, d) {})).toEqual(['a', 'b', 'c', 'd']);
                });

                it('should get arguments of an anonymous function, without spacing', function () {
                    expect(Func.argumentNames(function(a, b, c, d) {})).toEqual(['a', 'b', 'c', 'd']);
                });

                it('should get arguments of an anonymous function, with argument spacing', function () {
                    expect(Func.argumentNames(function(  a, b   ,  c  ,   d) {})).toEqual(['a', 'b', 'c', 'd']);
                });

                it('should get arguments of a named function', function () {
                    expect(Func.argumentNames(function foobar (a, b, c, d) {})).toEqual(['a', 'b', 'c', 'd']);
                });

                it('should return an empty array on an argument less function', function () {
                    expect(Func.argumentNames(function() {})).toEqual([]);
                });

            });

            describe('cache', function () {

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

        });

    }
);