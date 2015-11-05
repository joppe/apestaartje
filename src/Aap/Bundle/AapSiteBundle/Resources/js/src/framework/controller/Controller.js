/**
 * @author Joppe Aarts <joppe@zicht.nl>
 * @copyright Zicht Online <http://zicht.nl>
 */

import {ContainerAware} from 'lib/dependencyinjection/ContainerAware';

/**
 * @class Controller
 */
export class Controller extends ContainerAware {
    /**
     * @returns {Controller}
     */
    static getInstance() {
        return new this();
    }
}