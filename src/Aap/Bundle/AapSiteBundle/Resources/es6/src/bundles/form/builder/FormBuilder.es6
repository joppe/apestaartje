/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import {AbstractView} from 'bundles/backbone/view/AbstractView';
import {Exception} from 'lib/exception/Exception';

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
     */
    constructor(options) {
        super(options);

        this.fieldTypes = {};
    }

    /**
     * Add a field type
     *
     * @param {string} identifier
     * @param fieldType
     */
    addFieldType(identifier, fieldType) {
        this.fieldTypes[identifier] = fieldType;
    }

    /**
     * Add a field
     *
     * @param {string} propertyName
     * @param {string} fieldTypeIdentifier
     * @param {Object} options
     * @returns {FormBuilder}
     */
    add(propertyName, fieldTypeIdentifier, options) {
        let fieldType;

        if (undefined === this.fieldTypes[fieldTypeIdentifier]) {
            throw new Exception('Field type "' + fieldTypeIdentifier + '" does not exist');
        }

        options.model = this.model;
        options.property = propertyName;

        this.addChild(fieldType(options));

        return this;
    }
}