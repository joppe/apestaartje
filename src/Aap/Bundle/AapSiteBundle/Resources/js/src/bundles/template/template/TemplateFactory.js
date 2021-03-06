/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import {Exception} from 'lib/exception/Exception';
import _ from 'underscore';

let templates = {};

/**
 * @class TemplateFactory
 */
export class TemplateFactory {
    /**
     * @param {string} id
     * @returns {boolean}
     */
    static has(id) {
        return undefined !== templates[id];
    }

    /**
     * @param {string} id
     * @param {string} [html]
     * @returns {Function}
     * @throws Exception
     */
    static get(id, html) {
        let template;

        if (false === this.has(id)) {
            if (undefined === html) {
                throw new Exception('Template with id "' + id + '" does not exist and there is no html provided.');
            }

            template = _.template(html);
            templates[id] = template;
        }

        return templates[id];
    }
}