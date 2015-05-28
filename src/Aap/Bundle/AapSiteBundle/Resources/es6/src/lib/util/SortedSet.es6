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
     * @param {Array|string|number} value
     */
    constructor(value) {
        this.values = [];

        if (undefined !== value) {
            this.set(value);
        }
    }

    /**
     * Clear the values and set them with the given value(s)
     *
     * @param {Array|string|number} value
     * @returns {SortedSet}
     */
    set(value) {
        this.values = [];
        this.add(value);

        return this;
    }

    /**
     * Add a value or if array muliple values
     *
     * @param {Array|string|number} value
     * @returns {SortedSet}
     */
    add(value) {
        if (Array.isArray(value)) {
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
     * Remove a value
     *
     * @param {*} value
     * @returns {SortedSet}
     */
    remove(value) {
        this.values = _.without(this.values, value);

        return this;
    }

    /**
     * Check if a value exists
     *
     * @param {*} value
     * @returns {boolean}
     */
    contains(value) {
        return this.values.indexOf(value) !== -1;
    }

    /**
     * @returns {number}
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