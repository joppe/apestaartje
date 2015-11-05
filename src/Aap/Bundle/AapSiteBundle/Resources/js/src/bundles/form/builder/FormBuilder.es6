/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import {AbstractView} from 'bundles/backbone/view/AbstractView';

/**
 * @class FormBuilder
 */
export class FormBuilder extends AbstractView {
    get tagName() {
        return 'form';
    }

    get className() {
        return 'form-horizontal form';
    }

    /**
     * Constructor
     *
     * @param {Object} options
     * @param {FieldTypes} fieldTypes
     */
    constructor(options, fieldTypes) {
        super(options);

        this.fieldTypes = fieldTypes;
    }

    /**
     * Add a field
     *
     * @param {string} propertyName
     * @param {string} fieldTypeIdentifier
     * @param {Object} [options]
     * @returns {FormBuilder}
     * @throws {Exception}
     */
    add(propertyName, fieldTypeIdentifier, options) {
        let fieldType = this.fieldTypes.get(fieldTypeIdentifier);

        if (undefined === options) {
            options = {};
        }

        options.model = this.model;
        options.property = propertyName;

        this.addChild(fieldType(options));

        return this;
    }
}