/*global define*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    ['underscore', 'lib/lang/class', 'lib/lang/function'],
    function (_, Class, Func) {
        'use strict';

        var Service;

        /**
         * @typedef {Object} Container
         * @Function has
         * @Function get
         * @Function register
         * @Function alias
         */

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

        return {
            /**
             * @returns {Container}
             */
            create: function () {
                var services = {},
                    aliases = {},
                    resolve,
                    container;

                /**
                 * @param {string} name
                 * @returns {Service}
                 */
                resolve = function (name) {
                    var service;

                    if (undefined !== services[name]) {
                        service = services[name];
                    } else if (undefined !== aliases[name]) {
                        service = resolve(aliases[name]);
                    } else {
                        throw 'Cannot resolve service "' + name + '"';
                    }

                    return service;
                };

                container = {
                    /**
                     * Check if a service/alias exists
                     *
                     * @param {string} name
                     * @returns {boolean}
                     */
                    has: function (name) {
                        return (undefined !== services[name] || undefined !== aliases[name]);
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
                            service = resolve(name);
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
                     * @param name
                     * @param func
                     * @param singleton
                     * @returns {Container}
                     */
                    register: function (name, func, singleton) {
                        if (this.has(name)) {
                            throw 'Service "' + name + '" already defined';
                        }

                        services[name] = new Service(func, singleton);

                        return this;
                    },

                    /**
                     * @param alias
                     * @param name
                     * @returns {Container}
                     */
                    alias: function (alias, name) {
                        if (false === this.has(name)) {
                            throw 'Service "' + name + '" not found';
                        }

                        if (this.has(alias)) {
                            throw 'Service/alias "' + name + '" already exists';
                        }

                        aliases[alias] = name;

                        return this;
                    }
                };

                return container;
            }
        };
    }
);