/*global describe, it, expect*/

import {LL1Lexer} from 'lib/parsing/LL1Lexer';
import {Exception} from 'lib/exception/Exception';

describe('LL1Lexer', function () {
    'use strict';

    it('Match the character that is at the current index', function () {
        let l = new LL1Lexer('abcd');

        l.match('a');

        expect(l.index).toBe(1);
        expect(l.char).toBe('b');
    });

    it('No match throws an exception', function () {
        let l = new LL1Lexer('abcd');

        expect(function () {
            l.match('c');
        }).toThrow(new Exception('Expecting "c"; found "a"'));
    });

    it('Create a token', function () {
        let l = new LL1Lexer('abcd'),
            t = l.createToken(LL1Lexer.EOF, '');

        expect(t.toString()).toEqual('<"", "<EOF>">');
    });
});