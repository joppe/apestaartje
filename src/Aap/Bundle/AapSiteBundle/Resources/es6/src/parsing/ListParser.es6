import {Parser} from 'lib/parsing/Parser';
import {ListLexer} from 'parsing/ListLexer';

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
     */
    element() {
        if (this.lookahead.type === ListLexer.NAME) {
            this.match(ListLexer.NAME);
        } else if (this.lookahead.type === ListLexer.LBRACK) {
            this.list();
        } else {
            throw 'Expceting name or list; found "' + this.lookahead + '"';
        }
    }
}