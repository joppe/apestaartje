/*global define*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    [
        'lib/lang/class',
        'lib/dsl/lexer',
        'lib/dsl/token'
    ],
    function (
        Class,
        Lexer,
        Token
    ) {
        'use strict';

        var ListLexer;

        ListLexer = Class.createClass({
            /**
             * @param {string} input
             */
            initialize: function (input) {
                Class.callSuper(Lexer, 'initialize', [input], this);
            },

            /**
             * @param {number} tokenType
             * @returns {number}
             */
            getTokenName: function (tokenType) {
                return ListLexer.tokenNames[tokenType];
            },

            /**
             * @returns {boolean}
             */
            isLetter: function () {
                return (this.c >= 'a' && this.c <= 'x' || this.c >= 'A' && this.c <= 'X');
            },

            /**
             * @returns {boolean}
             */
            isWhitespace: function () {
                return /\s/.test(this.c);
            },

            /**
             * @returns Token
             */
            nextToken: function () {
                var token;

                while (this.c !== Lexer.EOF) {
                    if (this.isWhitespace()) {
                        this.whitespace();
                        continue;
                    } else if (',' === this.c) {
                        this.consume();
                        token = new Token(ListLexer.COMMA, ',');
                    } else if ('[' === this.c) {
                        this.consume();
                        token = new Token(ListLexer.LBRACK, '[');
                    } else if (']' === this.c) {
                        this.consume();
                        token = new Token(ListLexer.RBRACK, ']');
                    } else {
                        if (this.isLetter()) {
                            token = this.name();
                        } else {
                            throw 'Invalid character "' + this.c + '"';
                        }
                    }

                    if (undefined !== token) {
                        break;
                    }
                }

                if (undefined === token) {
                    token = new Token(Lexer.EOF, '<EOF>');
                }

                return token;
            },

            whitespace: function () {
                while (this.isWhitespace()) {
                    this.consume();
                }
            },

            name: function () {
                var buffer = '';

                do {
                    buffer += this.c;
                    this.consume();
                } while (this.isLetter());

                return new Token(ListLexer.NAME, buffer);
            }
        }, Lexer);

        ListLexer.NAME = 2;
        ListLexer.COMMA = 3;
        ListLexer.LBRACK = 4;
        ListLexer.RBRACK = 5;
        ListLexer.tokenNames = ['n/a', '<EOF>', 'NAME', 'COMMA', 'LBRACK', 'RBRACK'];

        return ListLexer;
    }
);
