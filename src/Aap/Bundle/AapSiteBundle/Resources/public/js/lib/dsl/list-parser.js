/*global define*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    [
        'lib/lang/class',
        'lib/dsl/parser',
        'lib/dsl/list-lexer'
    ],
    function (
        Class,
        Parser,
        ListLexer
    ) {
        'use strict';

        var ListParser;

        ListParser = Class.createClass({
            /**
             * @param {ListLexer} input
             */
            initialize: function (input) {
                Class.callSuper(Parser, 'initialize', [input], this);
            },

            /**
             * list: '[' elements ']'
             */
            list: function () {
                this.match(ListLexer.LBRACK);
                this.elements();
                this.match(ListLexer.RBRACK);
            },

            /**
             * elements: element (',' element)*
             */
            elements: function () {
                this.element();

                while (this.lookahead.type === ListLexer.COMMA) {
                    this.match(ListLexer.COMMA);
                    this.element();
                }
            },

            /**
             * element: name | list
             */
            element: function () {
                if (this.lookahead.type === ListLexer.NAME) {
                    this.match(ListLexer.NAME);
                } else if (this.lookahead.type === ListLexer.LBRACK) {
                    this.list();
                } else {
                    throw 'Expceting name or list; found "' + this.lookahead + '"';
                }
            }
        }, Parser);

        return ListParser;
    }
);
