/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

/**
 * @class Bundle
 */
export class Bundle {
    /**
     * @param {Container} container
     */
    constructor(container) {
        this.container = container;

        this.registerServices();
    }

    registerServices() {
    }
}