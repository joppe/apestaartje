/*global define*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    [
        'lib/lang/class',
        'lib/dsl/list-lexer'
    ],
    function (
        Class,
        ListLexer
    ) {
        'use strict';

        var Token;

        Token = Class.createClass({
            /**
             * @param {number} type
             * @param {string} text
             */
            initialize: function (type, text) {
                this.type = type;
                this.text = text;
            },

            /**
             * @returns {string}
             */
            toString: function () {
                var name = ListLexer.tokenNames[this.type];

                return '<"' + this.text + '", "' + name + '">';
            }
        });

        return Token;
    }
);
