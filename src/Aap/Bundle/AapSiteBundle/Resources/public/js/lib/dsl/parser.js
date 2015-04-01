/*global define*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    [
        'lib/lang/class',
        'lib/dsl/lexer'
    ],
    function (
        Class,
        Lexer
    ) {
        'use strict';

        var Parser;

        /**
         * A LL(1) Recursive Descent Parser
         *
         * @type {Function}
         */
        Parser = Class.createClass({
            /**
             * @param {Lexer} input
             */
            initialize: function (input) {
                this.input = input;
                this.lookahead = this.input.nextToken();
            },

            /**
             * @param {string} tokenType
             * @returns boolean
             */
            match: function (tokenType) {
                if (tokenType === this.lookahead.type) {
                    this.consume();
                } else {
                    throw 'Expecting "' + this.input.getTokenName(tokenType) + '"; found "' + this.lookahead + '"';
                }
            },

            consume: function () {
                this.lookahead = this.input.nextToken();
            }
        });

        return Parser;
    }
);
