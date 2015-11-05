/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import {AbstractField} from 'bundles/form/field/AbstractField';

let template = '' +
    '<label for="<%= id %>" class="col-sm-2 control-label"><%= label %></label>' +
    '<div class="col-sm-10">' +
        '<textarea class="form-control" placeholder="<%= placeholder %>" name="<%= name %>"><%= value %></textarea>' +
    '</div>';

/**
 * @class TextField
 */
export class TextField extends AbstractField {
    /**
     * @returns {Object}
     */
    get events() {
        return {
            'keyup textarea': 'setValue'
        };
    }

    /**
     * @param {Object} options
     * @param {Template} templateFactory
     */
    constructor(options, templateFactory) {
        super(options, templateFactory);

        this.setTemplate('field-text', template, options.template);
    }

    update() {
        this.$el.find('textarea').val(this.model.get(this.property));
    }

    setValue() {
        this.model.set(this.property, this.$el.find('textarea').val());
    }
}