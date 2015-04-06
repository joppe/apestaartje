const SNAKE_CHAR = /_(\w)/g;

export default class Str {
    /**
     * @param {string} str
     * @returns {string}
     */
    static snakeToCamelCase(str) {
        return str.toLowerCase().replace(SNAKE_CHAR, function (match, group) {
            return group.toUpperCase();
        });
    }
}