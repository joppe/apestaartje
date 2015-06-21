/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import {Token} from 'lib/parsing/Token';
import {Exception} from 'lib/exception/Exception';

/**
 * A LL(1) Lexer
 *
 * @class LL1Lexer
 */
export class LL1Lexer {
    /**
     * @param {string} input
     */
    constructor(input) {
        this.input = input;
        this.index = 0;
        this.char = this.input.charAt(this.index);
    }

    /**
     * @returns {LL1Lexer}
     */
    consume() {
        this.index += 1;

        if (this.index >= this.input.length) {
            this.char = LL1Lexer.EOF_TYPE;
        } else {
            this.char = this.input.charAt(this.index);
        }

        return this;
    }

    /**
     * @param {string} char
     * @returns {LL1Lexer}
     * @throws {Exception}
     */
    match(char) {
        if (this.char === char) {
            this.consume();
        } else {
            throw new Exception('Expecting "' + char + '"; found "' + this.char + '"');
        }

        return this;
    }

    /**
     * @throws {Exception}
     */
    nextToken() {
        throw new Exception('nextToken() not implemented for lexer');
    }

    /**
     * @param {number} tokenType
     * @throws Exception
     */
    getTokenName(tokenType) {
        return this.constructor.TOKEN_NAMES[tokenType];
    }

    /**
     * @param {number} tokenType
     * @param {string} text
     * @returns {Token}
     */
    createToken(tokenType, text) {
        return new Token(tokenType, this.getTokenName(tokenType), text);
    }
}

LL1Lexer.EOF = '-1';
LL1Lexer.EOF_TYPE = 1;
LL1Lexer.TOKEN_NAMES = ['n/a', '<EOF>'];