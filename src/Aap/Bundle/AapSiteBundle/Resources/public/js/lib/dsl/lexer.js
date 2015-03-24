/*global define*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    [
        'lib/lang/class'
    ],
    function (
        Class
    ) {
        'use strict';

        var Lexer;

        Lexer = Class.createClass({
            /**
             * @param {string} input
             */
            initialize: function (input) {
                this.input = input;
                this.p = 0;
                this.c = this.input.charAt(this.p);
            },

            consume: function () {
                this.p += 1;

                if (this.p >= this.input.length) {
                    this.c = Lexer.EOF;
                } else {
                    this.c = this.input.charAt(this.p);
                }
            },

            /**
             * @param {string} c
             */
            match: function (c) {
                if (this.c === c) {
                    this.consume();
                } else {
                    throw 'Expecting "' + c + '"; found "' + this.c + '"';
                }
            }
        });

        Lexer.EOF = 1;

        return Lexer;
    }
);
