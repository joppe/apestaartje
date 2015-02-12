/*global define, window*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    ['underscore', 'lib/lang/class'],
    function (_, Class) {
        'use strict';

        var SortedSet,
            sort;

        /**
         * Sort an array by its value
         *
         * @param {Array} values
         * @returns {Array}
         */
        sort = function (values) {
            return _.sortBy(_.uniq(values), function (value) {
                return value;
            });
        };

        /**
         * @class {SortedSet}
         */
        SortedSet = Class.createClass({
            /**
             * @param {Array|string|Number} value
             * @constructs
             */
            initialize: function (value) {
                this.values = [];

                if (undefined !== value) {
                    this.set(value);
                }
            },

            /**
             * @param {Array|string|Number} value
             * @returns {SortedSet}
             */
            set: function (value) {
                this.values = [];
                this.add(value);

                return this;
            },

            /**
             * @param {Array|string|Number} value
             * @returns {SortedSet}
             */
            add: function (value) {
                if (_.isArray(value)) {
                    _.each(value, this.add, this);
                } else {
                    this.values.push(value);
                    this.values = sort(this.values);
                }

                return this;
            },

            /**
             * @param {*} value
             * @returns {SortedSet}
             */
            remove: function (value) {
                this.values = _.without(this.values, value);

                return this;
            },

            /**
             * @param {*} value
             * @returns {boolean}
             */
            contains: function (value) {
                return _.indexOf(this.values, value) !== -1;
            },

            /**
             * @returns {Number}
             */
            length: function () {
                return this.values.length;
            }
        });

        return SortedSet;
    }
);
