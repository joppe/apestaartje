export const EOF = 1;

export class Lexer {
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
            this.c = Lexer.EOF;
        } else {
            this.c = this.input.charAt(this.p);
        }
    }

    /**
     * @param {string} c
     */
    match(c) {
        if (this.c === c) {
            this.consume();
        } else {
            throw 'Expecting "' + c + '"; found "' + this.c + '"';
        }
    }

    /**
     * @throws Exception
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