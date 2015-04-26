/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import {Kernel} from 'framework/Kernel';
import {BackboneBundle} from 'bundles/backbone/BackboneBundle';

/**
 * @class AppKernel
 */
export class AppKernel extends Kernel {
    constructor() {
        this.bundles = [
            BackboneBundle
        ];

        super();
    }
}