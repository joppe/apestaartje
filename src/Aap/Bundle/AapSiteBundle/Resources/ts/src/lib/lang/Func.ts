/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

/**
 * Regular expression to get the argument names of a string representation of a function. The arguments must be wrapped
 * in braces. Supports old fashioned functions and the fat arrow syntax.
 *
 * @constant {RegExp}
 */
const RE_FUNCTION_ARGS = /^(function)?[^\(]*\(([^\)]*)\)/m;

/**
 * This is a wrapper class for a function, it can be used to fetch all the names of the arguments.
 */
export class Func {
    /**
     * The wrapped function.
     *
     * @type {Function}
     */
    private func:Function;

    /**
     * The maximum number of times the function can be executed. Use -1 for no limit.
     *
     * @type {number}
     */
    private executionLimit:number;

    /**
     * The number of times the function is executed.
     *
     * @type {number}
     */
    private executionCount:number = 0;

    /**
     * The result of the last execution.
     *
     * @type {*}
     */
    private lastResult:any;

    /**
     * The cache of the names of the arguments.
     *
     * @type {Array}
     */
    private args:string[];

    /**
     * @param {Function} func the function to wrap
     * @param {number} [executionLimit] the maximum number of times the function can be executed. Use -1 for no limit.
     */
    constructor(func:Function, executionLimit:number = -1) {
        this.func = func;
        this.executionLimit = executionLimit;
    }

    /**
     * Execute the function and return the result.
     *
     * @param args
     * @returns {any}
     */
    invoke(...args:any[]):any {
        if (-1 === this.executionLimit || this.executionCount < this.executionLimit) {
            this.lastResult = this.func(...args);
            this.executionCount += 1;
        }

        return this.lastResult;
    }

    /**
     * Get all the names of the arguments
     *
     * @returns {string[]}
     */
    get argumentNames():string[] {
        if (undefined === this.args) {
            let str:string = this.func.toString(),
                matches:RegExpMatchArray = str.match(RE_FUNCTION_ARGS),
                group:number = 2;

            this.args = [];

            if (group <= matches.length && '' !== matches[group].trim()) {
                let names:string[] = matches[group].split(',');

                this.args = names.map(function (arg) {
                    return arg.trim();
                });
            }
        }

        return this.args;
    }
}