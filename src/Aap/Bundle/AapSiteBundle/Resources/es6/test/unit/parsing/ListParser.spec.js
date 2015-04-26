/*global describe, it, expect*/

import {ListParser} from 'parsing/ListParser';
import {ListLexer} from 'parsing/ListLexer';

describe('ListParser', function () {
    'use strict';

    it('Should parse without throwing exceptions', function () {
        let input = '[a,b,c]',
            l = new ListLexer(input),
            p = new ListParser(l);

        expect(p.list()).toBe(undefined);
    });

    it('Throw an exception when to string is nog valid', function () {
        let input = '[a.b,c]',
            l = new ListLexer(input),
            p = new ListParser(l);

        expect(function () {
            p.list();
        }).toThrow();
    });
});