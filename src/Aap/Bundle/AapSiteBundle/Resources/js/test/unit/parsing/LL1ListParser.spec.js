/*global describe, it, expect*/

import {LL1ListParser} from 'parsing/LL1ListParser';
import {LL1ListLexer} from 'parsing/LL1ListLexer';

describe('LL1ListParser', function () {
    'use strict';

    it('Should parse without throwing exceptions', function () {
        let input = '[a,b,c]',
            l = new LL1ListLexer(input),
            p = new LL1ListParser(l);

        expect(p.list()).toBe(undefined);
    });

    it('Throw an exception when to string is nog valid', function () {
        let input = '[a.b,c]',
            l = new LL1ListLexer(input),
            p = new LL1ListParser(l);

        expect(function () {
            p.list();
        }).toThrow();
    });
});