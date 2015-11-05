/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import _ from 'underscore';

let defaultSeperators = {
        param: '&',
        key: '=',
        value: ','
    };

/**
 * @class UriParser
 */
export class UriParser {
    /**
     * @param {Object} seperators
     */
    constructor(seperators = {}) {
        this.seperators = _.defaults(seperators, defaultSeperators);
    }

    /**
     * @param {string} uri
     * @returns {Object}
     */
    parse(uri) {
        var ret = {};

        uri.split(this.seperators.param).forEach((keyValue) => {
            var pair = keyValue.split(this.seperators.key),
                key,
                value;

            if (1 <= pair.length) {
                key = pair[0];
                ret[key] = [];
            }

            if (2 <= pair.length) {
                value = pair[1];

                value.split(this.seperators.value).forEach((v) => {
                    ret[key].push(decodeURIComponent(v));
                });
            }

        });

        return ret;
    }
}