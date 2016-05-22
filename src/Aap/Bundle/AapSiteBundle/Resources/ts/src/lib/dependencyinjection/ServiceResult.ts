/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

/**
 * @class ServiceResult
 */
export class ServiceResult<T> {
    /**
     * The value this class wraps.
     *
     * @type {any}
     */
    private value:T;

    /**
     * @param {any} value
     */
    constructor(value:T) {
        this.value = value;
    }

    /**
     * Check if the value is an object that has a given method.
     * 
     * @param {string} name
     * @returns {boolean}
     */
    hasMethod(name:string):boolean {
        let method;

        if (undefined === this.value) {
            return false;
        }

        method = this.value[name];

        return '[object Function]' === Object.prototype.toString.call(method);
    }

    /**
     * Call a method.
     * 
     * @param {string} name
     * @param {Array} args
     * @returns {ServiceResult}
     */
    callMethod(name:string, args:any[]):ServiceResult {
        if (false === this.hasMethod(name)) {
            throw new Error(`Method "${name}" does not exist`);
        }

        this.value[name](...args);

        return this;
    }

    /**
     * @returns {any}
     */
    getValue():T {
        return this.value;
    }
}
