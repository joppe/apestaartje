/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import {ContainerAware} from 'lib/dependencyinjection/ContainerAware';

/**
 * @class Bundle
 */
export class Bundle extends ContainerAware {
    /**
     * Constructor
     *
     * @param {Container} container
     */
    constructor(container) {
        this.container = container;
    }

    /**
     * @returns {void}
     */
    boot() {
        this.registerServices();
    }

    /**
     * @returns {void}
     */
    registerServices() {
    }
}