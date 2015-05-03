/*global describe, it, expect*/

import {LL1ListLexer} from 'parsing/LL1ListLexer';

describe('LL1ListLexer', function () {
    'use strict';

    it('Should contain all token names', function () {
        expect(LL1ListLexer.TOKEN_NAMES).toEqual([ 'n/a', '<EOF>', 'NAME', 'COMMA', 'LBRACK', 'RBRACK' ]);
    });

    it('Parse a clean list', function () {
        let input = '[a,b,c]',
            l = new LL1ListLexer(input),
            t = l.nextToken();

        expect(t.type).toBe(LL1ListLexer.LBRACK);
        t = l.nextToken();
        expect(t.type).toBe(LL1ListLexer.NAME);
        t = l.nextToken();
        expect(t.type).toBe(LL1ListLexer.COMMA);
        t = l.nextToken();
        expect(t.type).toBe(LL1ListLexer.NAME);
        t = l.nextToken();
        expect(t.type).toBe(LL1ListLexer.COMMA);
        t = l.nextToken();
        expect(t.type).toBe(LL1ListLexer.NAME);
        t = l.nextToken();
        expect(t.type).toBe(LL1ListLexer.RBRACK);
        t = l.nextToken();
        expect(t.type).toBe(LL1ListLexer.EOF);
    });

    it('To throw an error', function () {
        let input = '[a.b,c]',
            l = new LL1ListLexer(input);

        expect(function () {
            let t = l.nextToken();

            while (t.type !== LL1ListLexer.EOF) {
                t = l.nextToken();
            }
        }).toThrow('Invalid character "."');
    });
});