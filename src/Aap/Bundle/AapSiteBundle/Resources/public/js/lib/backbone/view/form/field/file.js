/*global define, FileReader*/

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

        var FieldFile,
            template = '' +
                '<label for="<%= id %>" class="col-sm-2 control-label"><%= label %></label>' +
                '<div class="preview"></div>' +
                '<div class="col-sm-10">' +
                    '<input type="file" class="form-control" name="<%= name %>">' +
                '</div>';

        FieldFile = AbstractField.extend({
            events: {
                'change input': 'setValue'
            },

            /**
             * @param {Object} options
             */
            initialize: function (options) {
                Class.callSuper(AbstractField, 'initialize', arguments, this);

                this.setTemplate('field-file', template, options.template);
            },

            update: function () {
                //this.$el.find('input').val(this.model.get(this.property));
            },

            setValue: function () {
                var $input = this.$el.find('input'),
                    reader = new FileReader();

                reader.onload = _.bind(function (event) {
                    this.$el.find('.preview').html('<img src="' + event.target.result + '">');
                }, this);

                reader.readAsDataURL($input.get(0).files[0]);

                //this.model.set(this.property, this.$el.find('input').val());
            }
        });

        return FieldFile;
    }
);