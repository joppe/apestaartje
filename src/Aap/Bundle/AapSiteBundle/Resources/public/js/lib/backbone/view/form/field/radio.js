/*global define*/

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

        var FieldRadio,
            template = '' +
                '<div class="col-sm-10 col-sm-push-2">' +
                    '<% for (var i = 0; i < options.length; i += 1) { %>' +
                        '<div class="radio">' +
                            '<label>' +
                                '<input type="radio" name="<%= name %>" value="<%= options[i].id %>"<% if (options[i].id === value) { %> checked<% } %>>' +
                                '<%= options[i].label %>' +
                            '</label>' +
                        '</div>' +
                    '<% } %>' +
                '</div>';

        FieldRadio = AbstractField.extend({
            events: {
                'change input': 'setValue'
            },

            /**
             * @param {Object} options
             */
            initialize: function (options) {
                Class.callSuper(AbstractField, 'initialize', arguments, this);

                this.options = options.options;
                this.defaultValue = options.defaultValue;

                this.setTemplate('field-radio', template, options.template);
            },

            update: function () {
                this.$el.find('input[value=' + this.model.get(this.property) + ']').prop('checked', true);
            },

            setValue: function () {
                this.model.set(this.property, this.$el.find('input:checked').val());
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

        return FieldRadio;
    }
);