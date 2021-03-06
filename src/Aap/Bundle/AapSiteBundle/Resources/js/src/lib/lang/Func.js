/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

const RE_ARGS = /^function[^\(]*\(([^\)]*)\)/m;

/**
 * @class Func
 */
export class Func {
    /**
     * @param {Function} func
     * @returns {Array}
     */
    static argumentNames(func) {
        let str = func.toString(),
            matches = str.match(RE_ARGS),
            args = [];

        if (1 <= matches.length && '' !== matches[1].trim()) {
            let names = matches[1].split(',');

            args = names.map(function (arg) {
                return arg.trim();
            });
        }

        return args;
    }
}