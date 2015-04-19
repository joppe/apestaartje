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
        this.p = 0;
        this.c = this.input.charAt(this.p);
    }

    consume() {
        this.p += 1;

        if (this.p >= this.input.length) {
            this.c = EOF;
        } else {
            this.c = this.input.charAt(this.p);
        }
    }

    /**
     * @param {string} c
     * @throws An exception
     */
    match(c) {
        if (this.c === c) {
            this.consume();
        } else {
            throw 'Expecting "' + c + '"; found "' + this.c + '"';
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