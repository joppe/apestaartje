/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import {Exception} from 'lib/exception/Exception';

/**
 * @class LL1Parser
 */
export class LL1Parser {
    /**
     * @param {Lexer} input
     */
    constructor(input) {
        this.input = input;
        this.lookahead = this.input.nextToken();
    }

    /**
     * @param {string} tokenType
     * @returns boolean
     */
    match(tokenType) {
        if (tokenType === this.lookahead.type) {
            this.consume();
        } else {
            throw new Exception('Expecting "' + this.input.getTokenName(tokenType) + '"; found "' + this.lookahead + '"');
        }
    }

    consume() {
        this.lookahead = this.input.nextToken();
    }
}