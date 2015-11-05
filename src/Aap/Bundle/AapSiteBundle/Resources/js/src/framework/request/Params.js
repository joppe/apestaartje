/**
 * @author Joppe Aarts <joppe@zicht.nl>
 * @copyright Zicht Online <http://zicht.nl>
 */

import {SortedMap} from 'lib/util/SortedMap';
import {UriParser} from 'framework/request/UriParser';

/**
 * @class Params
 */
export class Params extends SortedMap {
    /**
     * @param {UriParser} parser
     */
    constructor(parser) {
        super();

        if (undefined === parser) {
            parser = new UriParser();
        }

        this.parser = parser;
    }

    /**
     * @param {string} uri
     */
    setUri(uri) {
        this.set(uri);
    }
}