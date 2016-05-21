/**
 * @class MethodCall
 */
export class MethodCall<T> {
    /**
     * The name of the method.
     *
     * @type {string}
     */
    private name:string;

    /**
     * The arguments fot the method.
     *
     * @type {Array}
     */
    private args:T[];

    /**
     * @param {string} name
     * @param {Array} args
     */
    constructor(name:string, args:T[]) {
        this.name = name;
        this.args = args;
    }

    /**
     * @returns {string}
     */
    getName():string {
        return this.name;
    }

    /**
     * @returns {Array}
     */
    getArgs():T[] {
        return this.args;
    }
}
