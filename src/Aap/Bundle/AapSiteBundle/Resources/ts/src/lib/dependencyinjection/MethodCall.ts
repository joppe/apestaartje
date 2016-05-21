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
     * @param {Array} [args]
     * @throws Error
     */
    constructor(name:string, args:T[] = []) {
        if (false === Array.isArray(args)) {
            throw new Error('Argument args must be an array.');
        }

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
