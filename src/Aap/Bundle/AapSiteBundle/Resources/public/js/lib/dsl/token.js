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

        var Token;

        Token = Class.createClass({
            /**
             * @param {number} type
             * @param {string} text
             * @param {Lexer} lexer
             */
            initialize: function (type, text, lexer) {
                this.type = type;
                this.text = text;
                this.lexer = lexer;
            },

            /**
             * @returns {string}
             */
            toString: function () {
                var name = this.lexer.getTokenName(this.type);

                return '<"' + this.text + '", "' + name + '">';
            }
        });

        return Token;
    }
);
