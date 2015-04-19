/*global describe, it, expect*/

import {LL1Lexer} from 'lib/parsing/ll1-lexer';

describe('LL1Lexer', function () {
    'use strict';

    it('match', function () {
        let l = new LL1Lexer('abcd');

        l.match('a');

        expect(l.index).toBe(1);
        expect(l.char).toBe('b');
    });

    it('no match throws an exception', function () {
        let l = new LL1Lexer('abcd');

        expect(function () {
            l.match('c');
        }).toThrow();
    });
});