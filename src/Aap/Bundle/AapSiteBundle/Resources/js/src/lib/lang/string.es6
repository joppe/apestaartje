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

export class Str {
    /**
     * Escape a string by adding slashes to special regexp chars
     * The returned string can be used safely in a regular expression
     *
     * @param {string} str
     * @returns {string}
     */
    static escapeRegExp(str) {
        return str.replace(RE_ESCAPE, '\\$&');
    }

    /**
     * Convert a string that is split with a certain character to a camel cased word
     *
     * @example
     * str.toCamelCase('hello_world')
     * // returns 'helloWorld'
     *
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
}