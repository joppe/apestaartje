/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import {Bundle} from 'framework/bundle/Bundle';
import {FormBuilder} from 'bundles/form/builder/FormBuilder';

/**
 * @class FormBundle
 */
export class FormBundle extends Bundle {
    boot() {
        let formBuilderService = this.container.findDefinition('form_builder_formbuilder'),
            serviceIds = this.container.findTaggedServiceIds();

        serviceIds.forEach((serviceId) => {
            let fieldType = this.container.findDefinition(serviceId);

            formBuilderService.addMethodCall('addFieldType', [fieldType]);
        });
    }

    /**
     * @returns {void}
     */
    registerServices() {
        this.container.register('form_builder_formbuilder', function () {
            return new FormBuilder();
        }, false);
    }
}