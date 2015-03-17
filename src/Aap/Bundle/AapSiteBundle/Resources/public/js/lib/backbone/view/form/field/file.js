/*global define, FileReader*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    [
        'underscore',
        'lib/lang/class',
        'lib/backbone/view/form/field/abstract'
    ],
    function (
        _,
        Class,
        AbstractField
    ) {
        'use strict';

        var FieldFile,
            template = '' +
                '<label for="<%= id %>" class="col-sm-2 control-label"><%= label %></label>' +
                '<div class="col-sm-10 form__file__preview js-file"><%= value %></div>' +
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

                this.$el.addClass('form__file');
                this.setTemplate('field-file', template, options.template);
            },

            update: function () {
                var $target = this.$el.find('.js-file');

                //this.model.get(this.property)
                this.$el.find('input').val(null);
            },

            setValue: function () {
                var $input = this.$el.find('input'),
                    $target = this.$el.find('.js-file'),
                    file = $input.get(0).files[0],
                    reader;

                if (true === _.contains(['image/jpeg', 'image/gif'], file.type)) {
                    reader = new FileReader();

                    reader.onload = _.bind(function (event) {
                        $target.html('<img src="' + event.target.result + '">');
                    }, this);

                    reader.readAsDataURL(file);
                } else {
                    $target.html(file.name);
                }

                this.model.set(this.property, file);
            }
        });

        return FieldFile;
    }
);