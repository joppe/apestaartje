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

        sort = function (values) {
            return _.sortBy(_.uniq(values), function (value) {
                return value;
            });
        };

        SortedSet = Class.createClass({
            /**
             * @param {Array|string|number} values
             */
            initialize: function (value) {
                this.values = [];

                if (undefined !== value) {
                    this.set(value);
                }
            },

            /**
             * @param {Array|string|number} value
             */
            set: function (value) {
                this.values = [];
                this.add(value);
            },

            /**
             * @param {Array|string|number} value
             */
            add: function (value) {
                if (_.isArray(value)) {
                    _.each(value, this.add, this);
                } else {
                    this.values.push(value);
                    this.values = sort(this.values);
                }
            },

            remove: function (value) {

            }
        });

        return SortedSet;
    }
);
