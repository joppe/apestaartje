/*global define*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    [
        'jquery',
        'underscore',
        'lib/lang/class',
        'lib/backbone/view/form/field/abstract'
    ],
    function (
        $,
        _,
        Class,
        AbstractField
    ) {
        'use strict';

        var FieldCheckbox,
            template = '' +
                '<div class="col-sm-10 col-sm-push-2">' +
                    '<% for (var i = 0; i < options.length; i += 1) { %>' +
                        '<div class="checkbox">' +
                            '<label>' +
                                '<input type="checkbox" name="<%= name %>" value="<%= options[i].id %>"<% if (undefined !== collection.get(options[i].id)) { %> checked<% } %>>' +
                                '<%= options[i].label %>' +
                            '</label>' +
                        '</div>' +
                    '<% } %>' +
                '</div>';

        FieldCheckbox = AbstractField.extend({
            events: {
                'change input': 'setValue'
            },

            /**
             * @param {Object} options
             */
            initialize: function (options) {
                Class.callSuper(AbstractField, 'initialize', arguments, this);

                this.options = options.options;

                this.setTemplate('field-checkbox', template, options.template);

                this.stopListening(this.model);
                this.listenTo(this.model.get(this.property), 'add remove', _.bind(this.update, this));
            },

            update: function () {
                var collection = this.model.get(this.property);

                this.$el.find('input').each(function () {
                    var $el = $(this);

                    if (undefined === collection.get($el.attr('value'))) {
                        $el.prop('checked', false);
                    } else {
                        $el.prop('checked', true);
                    }
                });
            },

            /**
             * @param {Event} event
             */
            setValue: function (event) {
                var $el = $(event.target),
                    collection = this.model.get(this.property);

                if (true === $el.prop('checked')) {
                    collection.add({
                        id: $el.prop('value')
                    });
                } else {
                    collection.remove({
                        id: $el.prop('value')
                    });
                }
            },

            /**
             * @returns {Object}
             */
            getTemplateData: function () {
                var data = Class.callSuper(AbstractField, 'getTemplateData', arguments, this);

                data.options = this.options;
                data.collection = this.model.get(this.property);

                return data;
            }
        });

        return FieldCheckbox;
    }
);