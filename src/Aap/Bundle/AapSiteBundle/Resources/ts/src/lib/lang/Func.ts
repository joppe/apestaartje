/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

const RE_ARGS = /^function[^\(]*\(([^\)]*)\)/m;

/**
 * This is a wrapper class for a function, it can be used to fetch all the names of the arguments
 */
export class Func {
    private func:Function;

    constructor(func:Function) {
        this.func = func;
    }
    
    invoke(...args:any[]):any {
        return this.func(...args);
    }

    /**
     * Get all the names of the arguments
     *
     * @returns {string[]}
     */
    get argumentNames():string[] {
        let str:string = this.func.toString(),
            matches:string[] = str.match(RE_ARGS),
            args:string[] = [];

        if (0 < matches.length && '' !== matches[1].trim()) {
            let names:string[] = matches[1].split(',');

            args = names.map(function (arg) {
                return arg.trim();
            });
        }

        return args;
    }
}