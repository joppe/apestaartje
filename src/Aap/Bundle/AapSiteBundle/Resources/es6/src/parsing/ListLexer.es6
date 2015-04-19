import {LL1Lexer} from 'lib/parsing/LL1Lexer';
import {Token} from 'lib/parsing/Token';

/**
 * @param {number} type
 * @param {string} text
 * @returns {Token}
 */
function createToken(type, text) {
    return new Token(type, ListLexer.TOKEN_NAMES[type], text);
}

/**
 * @class
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
     */
    nextToken() {
        let token;

        while (this.char !== LL1Lexer.EOF) {
            if (this.isWhitespace()) {
                this.whitespace();
                continue;
            } else if (',' === this.char) {
                this.consume();
                token = createToken(ListLexer.COMMA, ',');
            } else if ('[' === this.char) {
                this.consume();
                token = createToken(ListLexer.LBRACK, '[');
            } else if (']' === this.char) {
                this.consume();
                token = createToken(ListLexer.RBRACK, ']');
            } else {
                if (this.isLetter()) {
                    token = this.name();
                } else {
                    throw 'Invalid character "' + this.char + '"';
                }
            }

            if (undefined !== token) {
                break;
            }
        }

        if (undefined === token) {
            token = createToken(LL1Lexer.EOF, '<EOF>');
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

        return createToken(ListLexer.NAME, buffer);
    }
}

ListLexer.NAME = 2;
ListLexer.COMMA = 3;
ListLexer.LBRACK = 4;
ListLexer.RBRACK = 5;
ListLexer.TOKEN_NAMES = ['n/a', '<EOF>', 'NAME', 'COMMA', 'LBRACK', 'RBRACK'];