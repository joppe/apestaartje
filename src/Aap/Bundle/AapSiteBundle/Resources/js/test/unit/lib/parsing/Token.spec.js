/*global describe, it, expect*/

import {Token} from 'lib/parsing/Token';

describe('Token', function () {
    'use strict';

    it('toString', function () {
        let t = new Token(1, 'COMMA', ',');

        expect(t.toString()).toBe('<",", "COMMA">');
    });
});