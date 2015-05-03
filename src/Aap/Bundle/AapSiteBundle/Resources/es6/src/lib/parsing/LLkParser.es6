/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import {Exception} from 'lib/exception/Exception';

/**
 * @class LLkParser
 */
export class LLkParser {
    /**
     * @param {Lexer} input
     * @param {number} bufferSize
     */
    constructor(input, bufferSize) {
        this.lookahead = [];
        this.input = input;
        this.bufferSize = bufferSize;
        this.index = 0;

        for (let i = 0; i < this.bufferSize; i += 1) {
            this.consume();
        }
    }

    /**
     * @returns {LLkParser}
     */
    consume() {
        this.lookahead[this.index] = this.input.nextToken();
        this.index = (this.index + 1) % this.bufferSize;

        return this;
    }

    /**
     * @param {number} offset
     * @returns {Token}
     */
    getLookaheadByOffset(offset) {
        return this.lookahead[(this.index + offset - 1) % this.bufferSize];
    }

    /**
     * @param {number} offset
     * @returns {number}
     */
    getLookaheadTypeByOffset(offset) {
        return this.getLookaheadByOffset(offset).type;
    }

    /**
     * @param {number} tokenType
     * @returns {LLkParser}
     */
    match(tokenType) {
        if (this.getLookaheadTypeByOffset(0) === tokenType) {
            this.consume();
        } else {
            throw new Exception('Expecting "' + this.input.getTokenName(tokenType) + '"; found "' + this.getLookaheadByOffset(0) + '"');
        }
    }
}