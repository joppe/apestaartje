/*global describe, it, expect*/

import {UriParser} from 'framework/request/UriParser';

describe('UriParser', function () {
    'use strict';

    it('Seperators should be default defined', function () {
        let u = new UriParser();

        expect(u.seperators).toEqual({
            param: '&',
            key: '=',
            value: ','
        });
    });

    it('Seperators can be provided', function () {
        let u = new UriParser({
                value: '|'
            });

        expect(u.seperators).toEqual({
            param: '&',
            key: '=',
            value: '|'
        });
    });

    it('Parse an url', function () {
        let u = new UriParser();

        expect(u.parse('foo=bar')).toEqual({
            foo: ['bar']
        });

        expect(u.parse('foo=bar&limit=1&page=2&filter=a,b')).toEqual({
            foo: ['bar'],
            limit: ['1'],
            page: ['2'],
            filter: ['a', 'b']
        });
    });
});