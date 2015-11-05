/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import {Bundle} from 'framework/bundle/Bundle';
import {Xhr} from 'bundles/backbone/sync/Xhr';

/**
 * @class BackboneBundle
 */
export class BackboneBundle extends Bundle {
    /**
     * @returns {void}
     */
    registerServices() {
        this.container.register('backboneSyncXhr', function () {
            return new Xhr();
        });
    }
}
