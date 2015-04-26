/*global describe, it, expect, beforeEach*/

import {LL1Parser} from 'lib/parsing/LL1Parser'
import {ListLexer} from 'parsing/ListLexer';
import {Exception} from 'lib/exception/Exception';

describe('LL1Parser', function () {
    'use strict';

    var input = '[a,b,c]',
        l,
        p;

    beforeEach(function () {
        l = new ListLexer(input);
        p = new LL1Parser(l);
    });

    it('Initially the lookahead must be the first token of the lexer', function () {
        expect(p.lookahead.type).toEqual(ListLexer.LBRACK);
        expect(p.lookahead.name).toEqual(l.getTokenName(ListLexer.LBRACK));
        expect(p.lookahead.text).toEqual('[');
    });

    it('The match method checks if the lookahead is of a given type', function () {
        expect(p.match(ListLexer.LBRACK)).toBe(p);
    });

    it('The match method throws an exception if the given type does not match', function () {
        expect(function () {
            p.match(ListLexer.COMMA);
        }).toThrow();
    });

    it('After a match the lookahead must be set to the next token', function () {
        p.match(ListLexer.LBRACK);

        expect(p.lookahead.type).toEqual(ListLexer.NAME);
        expect(p.lookahead.name).toEqual(l.getTokenName(ListLexer.NAME));
        expect(p.lookahead.text).toEqual('a');
    });

    it('The consume method sets the lookahead to the next token', function () {
        p.consume();

        expect(p.lookahead.type).toEqual(ListLexer.NAME);
        expect(p.lookahead.name).toEqual(l.getTokenName(ListLexer.NAME));
        expect(p.lookahead.text).toEqual('a');
    });
});