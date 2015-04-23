import {Token} from 'lib/parsing/Token';

/**
 * A LL(1) Lexer
 *
 * @class
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

    consume() {
        this.index += 1;

        if (this.index >= this.input.length) {
            this.char = LL1Lexer.EOF;
        } else {
            this.char = this.input.charAt(this.index);
        }
    }

    /**
     * @param {string} char
     * @throws An exception
     */
    match(char) {
        if (this.char === char) {
            this.consume();
        } else {
            throw 'Expecting "' + char + '"; found "' + this.char + '"';
        }
    }

    /**
     * @throws An exception
     */
    nextToken() {
        throw 'nextToken() not implemented for lexer';
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

LL1Lexer.EOF = 1;
LL1Lexer.TOKEN_NAMES = ['n/a', '<EOF>'];