/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

/**
 * @class Exception
 */
export class Exception {
    /**
     * @param {string} message
     */
    constructor(message) {
        this.message = message;
    }

    /**
     * @returns {string}
     */
    toString() {
        return this.message;
    }
}