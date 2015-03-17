/*global define*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    ['underscore', 'lib/lang/string'],
    function (_, Str) {
        'use strict';

        var ARGS = /^function[^\(]*\(([^\)]*)\)/m;

        return {
            /**
             * Get the names of the arguments of a function
             *
             * @param {Function} func
             * @returns {Array}
             */
            argumentNames: function (func) {
                var str = func.toString(),
                    matches = str.match(ARGS),
                    args = [];

                if (1 <= matches.length && '' !== Str.trim(matches[1])) {
                    args = _.map(matches[1].split(','), function (arg) {
                        return Str.trim(arg);
                    });
                }

                return args;
            },

            /**
             * Cache the result of a function
             *
             * @param {Function} func
             * @param {Object} [context]
             * @returns {Function}
             */
            cache: function (func, context) {
                var result;

                return function () {
                    if (null !== func) {
                        context = undefined !== context ? context : this;
                        result = func.apply(context, arguments);
                        func = null;
                    }

                    return result;
                };
            }
        };
    }
);