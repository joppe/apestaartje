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
     * @param {Container} container
     */
    constructor(container) {
        this.container = container;

        this.registerServices();
    }

    registerServices() {
    }
}