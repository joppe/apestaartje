/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import {Bundle} from 'framework/bundle/Bundle';
import {FieldTypes} from 'bundles/form/service/FieldTypes';
import {FormBuilder} from 'bundles/form/builder/FormBuilder';
import {TextField} from 'bundles/form/field/TextField';

/**
 * @class FormBundle
 */
export class FormBundle extends Bundle {
    /**
     * @returns {void}
     */
    boot() {
        let formTypes = this.container.findDefinition('fieldTypes'),
            serviceIds = this.container.findTaggedServiceIds('form_field');

        serviceIds.forEach((serviceId) => {
            let fieldType = this.container.get(serviceId);

            formTypes.addMethodCall('add', [serviceId, fieldType]);
        });
    }

    /**
     * @returns {void}
     */
    registerServices() {
        this.container.register('fieldTypes', function () {
            return new FieldTypes();
        }, true);

        this.container.register('formBuilder', function (fieldTypes) {
            return function (options) {
                return new FormBuilder(options, fieldTypes);
            };
        }, false);

        this.container.register('formTextField', function (templateFactory) {
            return function (options) {
                return new TextField(options, templateFactory);
            };
        }, false, 'form_field');
    }
}