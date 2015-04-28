/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import {Kernel} from 'framework/kernel/Kernel';
import {BackboneBundle} from 'bundles/backbone/BackboneBundle';

/**
 * @class AppKernel
 */
export class AppKernel extends Kernel {
    /**
     * @returns {Array}
     */
    registerBundles() {
        return [
            BackboneBundle
        ];
    }
}