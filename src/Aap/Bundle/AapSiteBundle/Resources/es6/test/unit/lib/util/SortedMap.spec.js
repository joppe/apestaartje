/*global describe, it, expect*/

import {SortedMap} from 'lib/util/SortedMap';

describe('SortedMap', function () {
    'use strict';

    it('With get all values will be returned from the SortedSet', function () {
        let m = new SortedMap({foo: 'bar'});

        expect(m.get('foo')).toEqual(['bar']);
    });

    it('Add will add the value to the SortedSet', function () {
        let m = new SortedMap({foo: 'bar'});

        m.add('foo', 2);

        expect(m.get('foo')).toEqual(['bar', 2]);
    });
});