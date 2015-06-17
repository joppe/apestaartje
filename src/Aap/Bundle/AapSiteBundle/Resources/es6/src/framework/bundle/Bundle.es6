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
     * @returns {string}
     */
    getName() {
        return this.constructor.name;
    }

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
        let router = this.container.get('router'),
            controllers = this.registerControllers();

        controllers.forEach((controller) => {
            router.registerController(this.getName(), controller);
        });
    }

    /**
     * @returns {void}
     */
    registerServices() {
    }

    /**
     * @returns {Array}
     */
    registerControllers() {
        return [];
    }
}