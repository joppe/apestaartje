/*global define, describe, jasmine, it, expect, beforeEach*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    ['lib/dependencyinjection/container'],
    function (Di) {
        'use strict';

        describe('DependencyInjection', function () {
            var di;

            beforeEach(function () {
                di = new Di();

                di.register('cached', function () {
                    return (new Date()).getTime();
                }, true);

                di.register('not-cached', function () {
                    return (new Date()).getTime();
                }, false);
            });

            it('can tell if a service id is defined with has()', function () {
                expect(di.has('cached')).toBe(true);
                expect(di.has('kached')).toBe(false);
            });

            it ('should cache service results', function () {
                var t = di.get('cached');

                window.setTimeout(function () {
                    expect(di.get('cached')).toBe(t);
                }, 500);
            });

        });

    }
);