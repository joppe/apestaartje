/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import {Bundle} from 'framework/bundle/Bundle';
import {TemplateFactory} from 'bundles/template/template/TemplateFactory';

/**
 * @class TemplateBundle
 */
export class TemplateBundle extends Bundle {
    /**
     * @returns {void}
     */
    registerServices() {
        this.container.register('templateFactory', function () {
            return TemplateFactory;
        }, false);
    }
}
