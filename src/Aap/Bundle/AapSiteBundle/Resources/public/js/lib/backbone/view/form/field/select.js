/*global define, window*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    [
        'lib/lang/class',
        'lib/backbone/view/form/field/abstract'
    ],
    function (
        Class,
        AbstractField
    ) {
        'use strict';

        var FieldSelect,
            template = '' +
                '<label for="<%= id %>" class="col-sm-2 control-label"><%= label %></label>' +
                '<div class="col-sm-10">' +
                    '<select class="form-control">' +
                        '<% for (var i = 0; i < options.length; i += 1) { %>' +
                            '<option value="<%= options[i].id %>"<% if (options[i].id === value) { %> selected<% } %>><%= options[i].label %></option>' +
                        '<% } %>' +
                    '</select>' +
                '</div>';

        FieldSelect = AbstractField.extend({
            events: {
                'change select': 'setValue'
            },

            /**
             * @param {Object} options
             */
            initialize: function (options) {
                Class.callSuper(AbstractField, 'initialize', arguments, this);

                this.options = options.options;
                this.defaultValue = options.defaultValue;

                this.setTemplate('field-select', template, options.template);
            },

            update: function () {
                this.$el.find('select').val(this.model.get(this.property));
            },

            setValue: function () {
                this.model.set(this.property, this.$el.find('select').val());
            },

            /**
             * @returns {Object}
             */
            getTemplateData: function () {
                var data = Class.callSuper(AbstractField, 'getTemplateData', arguments, this),
                    value = this.model.get(this.property);

                data.options = this.options;
                data.value =  undefined !== value ? value : this.defaultValue;

                return data;
            }
        });

        return FieldSelect;
    }
);