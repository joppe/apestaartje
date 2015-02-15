/*global define, describe, jasmine, it, expect*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    ['lib/util/sorted-set'],
    function (SortedSet) {
        'use strict';

        describe('SortedSet', function () {
            var s = new SortedSet(['foo', 'bar']);

            it('add values passed to constructor', function () {
                var s = new SortedSet(['foo', 'bar']);

                expect(s.getValues()).toEqual(['bar', 'foo']);
            });

            it('add values with the add method', function () {
                var s = new SortedSet(['foo', 'bar']);

                s.add(1);

                expect(s.getValues()).toEqual(['bar', 'foo', 1]);
            });

            it('does not have duplicates', function () {
                var s = new SortedSet(['foo', 'bar']);

                s.add('foo');

                expect(s.getValues()).toEqual(['bar', 'foo']);
            });

            it('contains a value and return true if so', function () {
                var s = new SortedSet(['foo', 'bar']);

                expect(s.contains('foo')).toEqual(true);
            });

            it('contains a value and return false if not', function () {
                var s = new SortedSet(['foo', 'bar']);

                expect(s.contains('foobar')).toEqual(false);
            });

        });

    }
);