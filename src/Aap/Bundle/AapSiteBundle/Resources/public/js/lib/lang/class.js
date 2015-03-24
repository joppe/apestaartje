/*global define*/

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
             * Get the class (definition) from a string
             *
             * @param {Object} namespace
             * @param {string} className
             * @returns {Object}
             */
            resolveClass: function (namespace, className) {
                return _.reduce(className.split('.'), function (target, part) {
                    return target[part];
                }, namespace);
            },

            /**
             * Call a method from the super class
             *
             * @param {Object} className
             * @param {string} method
             * @param {Array} args
             * @param {Object} context
             * @returns {*}
             */
            callSuper: function (className, method, args, context) {
                return className.prototype[method].apply(context, args);
            },

            /**
             * Create a class definition
             *
             * @param {Object} proto
             * @param {Object} [parent]
             * @returns {Function}
             */
            createClass: function (proto, parent) {
                var Class;

                parent = undefined !== parent ? parent.prototype : {};

                Class = function () {
                    if (undefined !== this.initialize) {
                        this.initialize.apply(this, arguments);
                    }
                };

                _.extend(Class.prototype, parent, proto);

                return Class;
            },

            /**
             * @param {Function} Class
             * @param {Array} args
             * @returns {Class}
             */
            createInstance: function (Class, args) {
                return new Class(args);
            }
        };
    }
);