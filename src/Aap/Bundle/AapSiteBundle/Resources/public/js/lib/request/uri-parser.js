/*global define*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    ['underscore', 'lib/lang/class'],
    function (_, Class) {
        'use strict';

        var UriParser,
            defaultSeperators = {
                param: '&',
                key: '=',
                value: ','
            };

        UriParser = Class.createClass({
            /**
             * @param {Object} seperators
             */
            initialize: function (seperators) {
                this.seperators = _.defaults(seperators, defaultSeperators);
            },

            /**
             * @param {string} uri
             * @returns {Object}
             */
            parseUri: function (uri) {
                var ret = {};

                _.each(uri.split(this.seperators.param), function (keyValue) {
                    var pair = keyValue.split(this.seperators.keyValue),
                        key,
                        value;

                    if (1 <= pair.length) {
                        key = pair[0];
                        ret[key] = [];
                    }

                    if (2 <= pair.length) {
                        value = pair[1];
                        ret[key] = value.split(this.seperators.value);
                    }

                }, this);

                return ret;
            }
        });

        return UriParser;
    }
);
