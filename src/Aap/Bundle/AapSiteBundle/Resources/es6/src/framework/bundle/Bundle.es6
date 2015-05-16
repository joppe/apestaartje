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
     * @returns {void}
     */
    init() {
        this.registerServices();
    }

    /**
     * @returns {void}
     */
    boot() {
        this.registerControllers();
    }

    /**
     * @returns {void}
     */
    registerServices() {
    }

    /**
     * @returns {void}
     */
    registerControllers() {
    }
}