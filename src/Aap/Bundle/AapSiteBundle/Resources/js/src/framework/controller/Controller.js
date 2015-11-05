/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
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