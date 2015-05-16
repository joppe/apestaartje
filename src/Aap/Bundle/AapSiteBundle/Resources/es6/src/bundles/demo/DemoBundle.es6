/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import {Bundle} from 'framework/bundle/Bundle';
import {MainController} from 'bundles/demo/controller/MainController';

/**
 * @class DemoBundle
 */
export class DemoBundle extends Bundle {
    /**
     * @returns {void}
     */
    boot() {
        let controller = new MainController();

        controller.setContainer(this.container);
    }
}