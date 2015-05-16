/**
 * @author Joppe Aarts <joppe@zicht.nl>
 * @copyright Zicht Online <http://zicht.nl>
 */

import {ContainerAware} from 'lib/dependencyinjection/ContainerAware';

/**
 * @class ControllerFactory
 */
export class ControllerFactory extends ContainerAware {
    constructor() {
        super();

        this.cache = {};
    }

    /**
     * @param {string} className
     * @returns {Controller}
     */
    getController(className) {
        let controller;

        if (undefined === this.cache[className]) {
            controller = className.constructor.getInstance();
            controller.setContainer(this.container);

            this.cache[className] = controller;
        }

        return this.cache[className];
    }
}