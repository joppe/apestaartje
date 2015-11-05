/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import {AbstractView} from 'bundles/backbone/view/AbstractView';
import _ from 'underscore';

/**
 * @class AbstractView
 */
export class AbstractField extends AbstractView {
    /**
     * @returns {string}
     */
    get className() {
        return 'form-group';
    }

    /**
     * @param {Object} options
     * @param {Template} templateFactory
     */
    constructor(options, templateFactory) {
        super(options);

        this.templateFactory = templateFactory;

        // this is the property of the model it is responsible for
        this.property = options.property;

        // the label of the form field
        this.label = undefined !== options.label ? options.label : this.property;

        // the id
        this.id = this.property + '-' + this.model.cid;

        // the placeholder text
        this.placeholder = undefined !== options.placeholder ? options.placeholder : '';

        // update the view when the property changes
        this.listenTo(this.model, 'change:' + this.property, _.bind(this.update, this));
    }

    /**
     * @returns {string}
     */
    identifier() {
        return this.property + '_' + this.model.cid;
    }

    update() {
    }

    /**
     * @param {string} identifier
     * @param {string} standard
     * @param {string} custom
     */
    setTemplate(identifier, standard, custom) {
        if (undefined !== custom) {
            this.template = this.templateFactory.get(_.uniqueId(identifier), custom);
        } else {
            this.template = this.templateFactory.get(identifier, standard);
        }
    }

    /**
     * @returns {AbstractField}
     */
    render() {
        this.$el.html(this.template(this.getTemplateData()));

        return this;
    }

    /**
     * @returns {Object}
     */
    getTemplateData() {
        return {
            id: this.id,
            name: this.property,
            label: this.label,
            placeholder: this.placeholder,
            value: this.model.get(this.property)
        };
    }
}