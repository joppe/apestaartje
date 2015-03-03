/*global define*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    ['underscore', 'lib/lang/class', 'lib/lang/function'],
    function (_, Class, Func) {
        'use strict';

        var Container,
            Service;

        /**
         * @type {Function} Service
         */
        Service = Class.createClass({
            /**
             * Constructor
             *
             * @param {Function} func
             * @param {boolean} singleton
             */
            initialize: function (func, singleton) {
                this.args = Func.argumentNames(func);

                if (true === singleton) {
                    this.func = Func.cache(func);
                } else {
                    this.func = func;
                }
            },

            /**
             * Get the result of the service function
             *
             * @param {Array} args
             * @returns {*}
             */
            get: function (args) {
                return this.func.apply(this.func, args);
            },

            /**
             * Returns an array with the names of the arguments that need to be passed to the service function
             *
             * @returns {Array}
             */
            getArgumentNames: function () {
                return this.args;
            }
        });

        /**
         * @type {Function} Container
         */
        Container = Class.createClass({
            /**
             * Constructor
             */
            initialize: function () {
                this.services = {};
            },

            /**
             * Check if a service exists
             *
             * @param {string} name
             * @returns {boolean}
             */
            has: function (name) {
                return undefined !== this.services[name];
            },

            /**
             * Get a service
             *
             * @param {string} name
             * @returns {*}
             */
            get: function (name) {
                var result,
                    service,
                    args;

                if (this.has(name)) {
                    service = this.services[name];
                    args = _.map(service.getArgumentNames(), function (arg) {
                        return this.has(arg) ? this.get(arg) : null;
                    }, this);
                    result = service.get(args);
                } else {
                    throw 'Service "' + name + '" not found';
                }

                return result;
            },

            /**
             * Create a new service
             *
             * @param {string} name
             * @param {Function} func
             * @param {boolean} singleton
             * @returns {Container}
             */
            register: function (name, func, singleton) {
                this.services[name] = new Service(func, singleton);

                return this;
            }
        });

        return Container;
    }
);