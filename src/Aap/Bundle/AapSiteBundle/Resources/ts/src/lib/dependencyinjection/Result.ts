/**
 * @class Result
 */
export class Result<T> {
    /**
     * The value this class wraps
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
     * @param {string} name
     * @param {Array} args
     * @returns {Result}
     */
    applyMethod(name:string, args:any[]):Result {
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
