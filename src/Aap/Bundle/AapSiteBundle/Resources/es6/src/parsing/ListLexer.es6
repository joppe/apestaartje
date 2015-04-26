/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import {LL1Lexer} from 'lib/parsing/LL1Lexer';
import {Exception} from 'lib/exception/Exception';

/**
 * @class ListLexer
 */
export class ListLexer extends LL1Lexer {
    /**
     * @returns {boolean}
     */
    isLetter() {
        return (this.char >= 'a' && this.char <= 'x' || this.char >= 'A' && this.char <= 'X');
    }

    /**
     * @returns {boolean}
     */
    isWhitespace() {
        return /\s/.test(this.char);
    }

    /**
     * @returns Token
     * @throws {Exception}
     */
    nextToken() {
        let token;

        while (this.char !== LL1Lexer.EOF) {
            if (this.isWhitespace()) {
                this.whitespace();
                continue;
            } else if (',' === this.char) {
                this.consume();
                token = this.createToken(ListLexer.COMMA, ',');
            } else if ('[' === this.char) {
                this.consume();
                token = this.createToken(ListLexer.LBRACK, '[');
            } else if (']' === this.char) {
                this.consume();
                token = this.createToken(ListLexer.RBRACK, ']');
            } else {
                if (this.isLetter()) {
                    token = this.name();
                } else {
                    throw new Exception('Invalid character "' + this.char + '"');
                }
            }

            if (undefined !== token) {
                break;
            }
        }

        if (undefined === token) {
            token = this.createToken(LL1Lexer.EOF, '<EOF>');
        }

        return token;
    }

    whitespace() {
        while (this.isWhitespace()) {
            this.consume();
        }
    }

    /**
     * @returns {Token}
     */
    name() {
        let buffer = '';

        do {
            buffer += this.char;
            this.consume();
        } while (this.isLetter());

        return this.createToken(ListLexer.NAME, buffer);
    }
}

ListLexer.NAME = 2;
ListLexer.COMMA = 3;
ListLexer.LBRACK = 4;
ListLexer.RBRACK = 5;
ListLexer.TOKEN_NAMES = LL1Lexer.TOKEN_NAMES.concat(['NAME', 'COMMA', 'LBRACK', 'RBRACK']);