/*global define*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    ['underscore'],
    function (_) {
        'use strict';

        var templates = {};

        return {
            /**
             * @param {string} id
             * @param {string} [html]
             * @returns {Function}
             */
            get: function (id, html) {
                var template;

                if (undefined === templates[id]) {
                    template = _.template(html);
                    templates[id] = template;
                }

                return templates[id];
            }
        };
    }
);
