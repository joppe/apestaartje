/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import {Parser} from 'lib/parsing/Parser';
import {ListLexer} from 'parsing/ListLexer';
import {Exception} from 'lib/exception/Exception';

/**
 * @class
 */
export class ListParser {
    /**
     * list: '[' elements ']'
     */
    list() {
        this.match(ListLexer.LBRACK);
        this.elements();
        this.match(ListLexer.RBRACK);
    }

    /**
     * elements: element (',' element)*
     */
    elements() {
        this.element();

        while (this.lookahead.type === ListLexer.COMMA) {
            this.match(ListLexer.COMMA);
            this.element();
        }
    }

    /**
     * element: name | list
     *
     * @throws {Exception}
     */
    element() {
        if (this.lookahead.type === ListLexer.NAME) {
            this.match(ListLexer.NAME);
        } else if (this.lookahead.type === ListLexer.LBRACK) {
            this.list();
        } else {
            throw new Exception('Expceting name or list; found "' + this.lookahead + '"');
        }
    }
}