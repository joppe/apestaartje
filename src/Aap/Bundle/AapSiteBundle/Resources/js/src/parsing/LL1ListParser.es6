/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import {LL1Parser} from 'lib/parsing/LL1Parser';
import {LL1ListLexer} from 'parsing/LL1ListLexer';
import {Exception} from 'lib/exception/Exception';

/**
 * @class LL1ListParser
 */
export class LL1ListParser extends LL1Parser {
    /**
     * list: '[' elements ']'
     */
    list() {
        this.match(LL1ListLexer.LBRACK);
        this.elements();
        this.match(LL1ListLexer.RBRACK);
    }

    /**
     * elements: element (',' element)*
     */
    elements() {
        this.element();

        while (this.lookahead.type === LL1ListLexer.COMMA) {
            this.match(LL1ListLexer.COMMA);
            this.element();
        }
    }

    /**
     * element: name | list
     *
     * @throws {Exception}
     */
    element() {
        if (this.lookahead.type === LL1ListLexer.NAME) {
            this.match(LL1ListLexer.NAME);
        } else if (this.lookahead.type === LL1ListLexer.LBRACK) {
            this.list();
        } else {
            throw new Exception('Expceting name or list; found "' + this.lookahead + '"');
        }
    }
}