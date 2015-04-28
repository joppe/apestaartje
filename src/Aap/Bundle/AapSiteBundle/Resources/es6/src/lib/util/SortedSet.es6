/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import _ from 'underscore';

/**
 * @class SortedSet
 */
export class SortedSet {
    /**
     * Constructor
     *
     * @param {Array|string|Number} value
     */
    constructor(value) {
        this.values = [];

        if (undefined !== value) {
            this.set(value);
        }
    }

    /**
     * @param {Array|string|Number} value
     * @returns {SortedSet}
     */
    set(value) {
        this.values = [];
        this.add(value);

        return this;
    }

    /**
     * @param {Array|string|Number} value
     * @returns {SortedSet}
     */
    add(value) {
        if (_.isArray(value)) {
            value.forEach((v) => {
                this.add(v);
            });
        } else {
            this.values.push(value);
            this.sort(this.values);
        }

        return this;
    }

    /**
     * @param {*} value
     * @returns {SortedSet}
     */
    remove(value) {
        this.values = _.without(this.values, value);

        return this;
    }

    /**
     * @param {*} value
     * @returns {boolean}
     */
    contains(value) {
        return this.values.indexOf(value) !== -1;
    }

    /**
     * @returns {Number}
     */
    length() {
        return this.values.length;
    }

    /**
     * @returns {Array}
     */
    getValues() {
        return this.values;
    }

    /**
     * @returns {void}
     */
    sort() {
        this.values = _.sortBy(_.uniq(this.values), function (value) {
            return value;
        });
    }
}