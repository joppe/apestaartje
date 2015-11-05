/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import {Exception} from 'lib/exception/Exception';

/**
 * @class FieldTypes
 */
export class FieldTypes {
    constructor() {
        this.types = {};
    }

    /**
     * @param {string} identifier
     * @returns {boolean}
     */
    has(identifier) {
        return undefined !== this.types[identifier];
    }

    /**
     * @param {string} identifier
     * @param {AbstractField} type
     * @returns {FieldTypes}
     */
    add(identifier, type) {
        if (this.has(identifier)) {
            throw new Exception('Field type with identifier "' + identifier + '" already defined.');
        }

        this.types[identifier] = type;

        return this;
    }

    /**
     * @param {string} identifier
     * @returns {AbstractField}
     */
    get(identifier) {
        if (false === this.has(identifier)) {
            throw new Exception('Field type with identifier "' + identifier + '" not defined.');
        }

        return this.types[identifier];
    }
}