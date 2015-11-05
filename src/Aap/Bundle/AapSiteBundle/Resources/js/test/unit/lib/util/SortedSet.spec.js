/*global describe, it, expect*/

import {SortedSet} from 'lib/util/SortedSet';

describe('SortedSet', function () {
    'use strict';

    it('The initial length should be 0', function () {
        let s = new SortedSet();

        expect(s.length()).toBe(0);
    });

    it('Add a value by passing it to the constructor', function () {
        let s = new SortedSet(100);

        expect(s.length()).toBe(1);
    });

    it('Add values by passing it to the constructor', function () {
        let s = new SortedSet([1, 2, 3]);

        expect(s.length()).toBe(3);
    });

    it('Use the add method to add new values', function () {
        let s = new SortedSet([1, 2, 3]);

        s.add(4);

        expect(s.length()).toBe(4);
    });

    it('Remove a value', function () {
        let s = new SortedSet([1, 2, 3]);

        s.remove(2);

        expect(s.length()).toBe(2);
    });

    it('Check if a value exists', function () {
        let s = new SortedSet([1, 2, 3]);

        expect(s.contains(2)).toBe(true);
        expect(s.contains(200)).toBe(false);
    });

    it('Get all values', function () {
        let s = new SortedSet([1, 2, 3]);

        expect(s.getValues()).toEqual([1, 2, 3]);
    });
});