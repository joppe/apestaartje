/**
 * @author Joppe Aarts <joppe@zicht.nl>
 * @copyright Zicht Online <http://zicht.nl>
 */

import {Params} from 'framework/request/params';

/**
 * @class Request
 */
export class Request {
    /**
     * @param {string} uri
     */
    constructor(uri) {
        this.params = new Params();
        this.params.setUri(uri);
    }
}