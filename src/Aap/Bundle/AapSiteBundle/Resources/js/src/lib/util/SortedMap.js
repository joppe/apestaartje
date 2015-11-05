/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import {SortedSet} from 'lib/util/SortedSet';
import _ from 'underscore';

/**
 * @class SortedMap
 */
export class SortedMap {
    /**
     * Constructor
     *
     * @param {Object} obj
     */
    constructor(obj) {
        this.set(obj);
    }

    /**
     * Clear the values. Store all the keys and their values
     *
     * @param {Object} obj
     */
    set(obj) {
        this.values = {};

        _.each(obj, function (value, key) {
            this.add(key, value);
        }, this);
    }

    /**
     * Add a key value
     *
     * @param {string} key
     * @param {Array|string|number} value
     */
    add(key, value) {
        if (false === this.exists(key)) {
            this.values[key] = new SortedSet();
        }

        this.values[key].add(value);
    }

    /**
     * Replace a key
     *
     * @param {string} key
     * @param {Array|string|number} value
     */
    replace(key, value) {
        this.values[key] = new SortedSet(value);
    }

    /**
     * Get the values of a key
     *
     * @param {string} key
     * @returns {Array}
     */
    get(key) {
        var ret = [];

        if (true === this.exists(key)) {
            ret = this.values[key].getValues();
        }

        return ret;
    }

    /**
     * Check if a key value combination exists
     *
     * @param {string} key
     * @param {Array|string|value} value
     */
    contains(key, value) {
        var ret = false;

        if (true === this.exists(key)) {
            ret = this.values[key].contains(value);
        }

        return ret;
    }

    /**
     * Remove a value from a key
     *
     * @param {string} key
     * @param {Array|string|value} value
     */
    remove(key, value) {
        if (true === this.exists(key)) {
            this.values[key].remove(value);
        }
    }

    /**
     * @param {string} key
     * @param {Array|string|value} value
     */
    merge(key, value) {
        if (true === this.exists(key)) {
            this.values[key].add(value);
        }
    }

    /**
     * @param {string} key
     */
    unset(key) {
        delete this.values[key];
    }

    /**
     * @param {string} key
     * @returns {boolean}
     */
    exists(key) {
        return undefined !== this.values[key];
    }

    /**
     * Remove empty sets
     */
    cleanup() {
        _.each(this.values, function (value, key) {
            if (0 === value.length) {
                this.unset(key);
            }
        }, this);
    }
}