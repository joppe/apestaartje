/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import {AbstractView} from 'bundles/backbone/AbstractView';
import {Exception} from 'lib/exception/Exception';

/**
 * @class FormBuilder
 */
export class FormBuilder extends AbstractView {
    /**
     * Constructor
     *
     * @param {Object} options
     */
    constructor(options) {
        this.tagName = 'form';
        this.className = 'form-horizontal form';
        this.fieldTypes = {};

        super(options);
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