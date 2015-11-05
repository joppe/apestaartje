/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import {Params} from 'framework/request/Params';

/**
 * @class Request
 */
export class Request {
    constructor() {
        this.uri = '';
        this.params = new Params();
    }

    /**
     * @param {string} uri
     */
    setUri(uri) {
        let quotPos = uri.indexOf('?');

        this.uri = uri.substring(0, -1 === quotPos ? uri.length : quotPos);
        this.params.setUri(uri);
    }
}