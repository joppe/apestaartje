/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

/**
 * @class Token
 */
export class Token {
    /**
     * @param {number} type
     * @param {string} name
     * @param {string} text
     */
    constructor(type, name, text) {
        this.type = type;
        this.name = name;
        this.text = text;
    }

    /**
     * @returns {string}
     */
    toString() {
        return '<"' + this.text + '", "' + this.name + '">';
    }
}