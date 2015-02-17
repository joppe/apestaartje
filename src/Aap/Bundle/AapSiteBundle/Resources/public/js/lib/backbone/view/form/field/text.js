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

        var FieldText,
            template = '' +
                '<label for="<%= id %>" class="col-sm-2 control-label"><%= label %></label>' +
                '<div class="col-sm-10">' +
                    '<textarea class="form-control" placeholder="<%= placeholder %>" name="<%= name %>"><%= value %></textarea>' +
                '</div>';

        FieldText = AbstractField.extend({
            /**
             * @param {Object} options
             */
            initialize: function (options) {
                Class.callSuper(AbstractField, 'initialize', arguments, this);

                this.template = this.services.get('template').get('field-text', template);
            }
        });

        return FieldText;
    }
);
