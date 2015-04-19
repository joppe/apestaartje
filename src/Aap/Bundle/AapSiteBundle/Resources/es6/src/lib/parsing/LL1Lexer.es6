export const EOF = 1;

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
            this.char = EOF;
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
        throw 'nextToken() not implemented for lexer, tokenType "' + tokenType + '" given';
    }
}