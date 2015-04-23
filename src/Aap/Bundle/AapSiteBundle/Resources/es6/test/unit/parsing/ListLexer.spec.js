/*global describe, it, expect*/

import {ListLexer} from 'parsing/ListLexer';

describe('ListLexer', function () {
    'use strict';

    it('Should contain all token names', function () {
        expect(ListLexer.TOKEN_NAMES).toEqual([ 'n/a', '<EOF>', 'NAME', 'COMMA', 'LBRACK', 'RBRACK' ]);
    });

    it('Parse a clean list', function () {
        let input = '[a,b,c]',
            l = new ListLexer(input),
            t = l.nextToken();

        expect(t.type).toBe(ListLexer.LBRACK);
        t = l.nextToken();
        expect(t.type).toBe(ListLexer.NAME);
        t = l.nextToken();
        expect(t.type).toBe(ListLexer.COMMA);
        t = l.nextToken();
        expect(t.type).toBe(ListLexer.NAME);
        t = l.nextToken();
        expect(t.type).toBe(ListLexer.COMMA);
        t = l.nextToken();
        expect(t.type).toBe(ListLexer.NAME);
        t = l.nextToken();
        expect(t.type).toBe(ListLexer.RBRACK);
        t = l.nextToken();
        expect(t.type).toBe(ListLexer.EOF);
    });

    it('To throw an error', function () {
        let input = '[a.b,c]',
            l = new ListLexer(input);

        expect(function () {
            let t = l.nextToken();

            while (t.type !== ListLexer.EOF) {
                t = l.nextToken();
            }
        }).toThrow('Invalid character "."');
    });
});