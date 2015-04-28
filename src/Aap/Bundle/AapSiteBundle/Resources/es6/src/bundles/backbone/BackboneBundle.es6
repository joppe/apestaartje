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
    registerServices() {
        this.container.register('backbone_sync_xhr', function () {
            return new Xhr();
        });
    }
}
