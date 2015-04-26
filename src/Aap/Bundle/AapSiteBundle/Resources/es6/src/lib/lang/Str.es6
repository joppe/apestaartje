/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

/**
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions}
 */
export const RE_SPECIALS = [
    '.',
    '*',
    '+',
    '?',
    '^',
    '$',
    '{',
    '}',
    '(',
    ')',
    '|',
    '[',
    ']',
    '\\'
];

const RE_ESCAPE = new RegExp('[' + RE_SPECIALS.join('\\') + ']', 'g');

const RE_FIRST_CHAR = /(^\w)/g;

const RE_UPPERCASE_CHAR = /([A-Z])/g;

export const PAD_LEFT = 1;

export const PAD_RIGHT = 2;

/**
 * @class Str
 */
export class Str {
    /**
     * Escape a string by adding slashes to special regexp chars.
     * The returned string can be used safely in a regular expression.
     *
     * @static
     * @param {string} str
     * @returns {string}
     */
    static escapeRegExp(str) {
        return str.replace(RE_ESCAPE, '\\$&');
    }

    /**
     * Convert a string that is split with a certain character to a camel cased word.
     *
     * @example
     * str.toCamelCase('hello_world')
     * // returns 'helloWorld'
     * @static
     * @param {string} str
     * @param {string} [split]
     * @returns {string}
     */
    static toCamelCase(str, split = '-_') {
        var re = new RegExp('[' + Str.escapeRegExp(split) + '](.?)');

        return str.replace(re, function (match, group) {
            return group.toUpperCase();
        });
    }

    /**
     * Converts a camel cased string to underscore notation, property style.
     *
     * @static
     * @param {string} str
     * @returns {string}
     */
    static toSnakeCase(str) {
        return str.replace(/([A-Z])/g, function (match, group) {
            return '_' + group.toLowerCase();
        });
    }

    /**
     * Converts a camel cased string to dashed notation, css style.
     *
     * @static
     * @param {string} str
     * @returns {string}
     */
    static toSpineCase(str) {
        return str.replace(RE_UPPERCASE_CHAR, function (match, group) {
            return '-' + group.toLowerCase();
        });
    }

    /**
     * Transform the first character of a string to uppercase.
     *
     * @static
     * @param {string} str
     * @returns {string}
     */
    static ucfirst(str) {
        return str.replace(RE_FIRST_CHAR, function (match, group) {
            return group.toUpperCase();
        });
    }

    /**
     * @static
     * @param {string} str
     * @param {number} length
     * @param {string} char
     * @param {number} [direction]
     * @returns {string}
     */
    static pad(str, length, char, direction = PAD_LEFT) {
        let padLength = length - str.length,
            padString = '';

        if (padLength === 1) {
            padString = char;
        } else if (padLength > 1) {
            padString = new Array(padLength + 1).join(char);
        }

        if (direction === PAD_LEFT) {
            str = padString + str;
        } else if (direction === PAD_RIGHT) {
            str += padString;
        }

        return str;
    }
}