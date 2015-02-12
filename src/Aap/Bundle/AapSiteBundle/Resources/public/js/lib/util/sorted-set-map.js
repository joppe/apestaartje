/*global define*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    ['lib/lang/class', 'underscore', 'lib/util/sorted-set'],
    function (Class, _, SortedSet) {
        'use strict';

        var SortedSetMap;

        /**
         * @class {SortedSetMap}
         */
        SortedSetMap = Class.createClass({
            /**
             * @param {Object} obj
             * @constructs
             */
            initialize: function (obj) {
                this.set(obj);
            },

            /**
             * @param {Object} obj
             */
            set: function (obj) {
                this.values = {};

                _.each(obj, function (value, key) {
                    this.add(key, value);
                }, this);
            },

            /**
             * @param {string} key
             * @param {Array|string|value} value
             */
            add: function (key, value) {
                if (false === this.exists(key)) {
                    this.values[key] = new SortedSet();
                }

                this.values[key].add(value);
            },

            /**
             * @param {string} key
             * @param {Array|string|value} value
             */
            replace: function (key, value) {
                this.values[key] = new SortedSet(value);
            },

            /**
             * @param {string} key
             * @returns {Array}
             */
            get: function (key) {
                var ret = [];

                if (true === this.exists(key)) {
                    ret = this.values[key].getValues();
                }

                return ret;
            },

            /**
             * @param {string} key
             * @param {Array|string|value} value
             */
            contains: function (key, value) {
                var ret = false;

                if (true === this.exists(key)) {
                    ret = this.values[key].contains(value);
                }

                return ret;
            },

            /**
             * @param {string} key
             * @param {Array|string|value} value
             */
            remove: function (key, value) {
                if (true === this.exists(key)) {
                    this.values[key].remove(value);
                }
            },

            /**
             * @param {string} key
             * @param {Array|string|value} value
             */
            merge: function (key, value) {
                if (true === this.exists(key)) {
                    this.values[key].add(value);
                }
            },

            /**
             * @param {string} key
             */
            unset: function (key) {
                delete this.values[key];
            },

            /**
             * @param {string} key
             * @returns {boolean}
             */
            exists: function (key) {
                return undefined !== this.values[key];
            },

            /**
             * Remove empty sets
             */
            cleanup: function () {
                _.each(this.values, function (value, key) {
                    if (0 === value.length) {
                        this.unset(key);
                    }
                }, this);
            }
        });

        return SortedSetMap;
    }
);
