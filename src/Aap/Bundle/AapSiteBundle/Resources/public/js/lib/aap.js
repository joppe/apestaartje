/*global define, window*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    ['underscore'],
    function (_) {
    'use strict';

    return {
        /**
         * @param {string} namespace
         * @returns {Object}
         */
        createNamespace: function (namespace) {
            var target = window;

            _.each(namespace.split('.'), function (part) {
                if (undefined === target[part]) {
                    target[part] = {};
                }

                target = target[part];
            });

            return target;
        }
    };
});
