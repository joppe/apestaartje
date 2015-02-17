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

        var FieldString,
            template = '' +
                '<label for="<%= id %>" class="col-sm-2 control-label"><%= label %></label>' +
                '<div class="col-sm-10">' +
                    '<input type="text" class="form-control" placeholder="<%= placeholder %>" value="<%= value %>" name="<%= name %>">' +
                '</div>';

        FieldString = AbstractField.extend({
            /**
             * @param {Object} options
             */
            initialize: function (options) {
                Class.callSuper(AbstractField, 'initialize', arguments, this);

                this.template = this.services.get('template').get('field-string', template);
            }
        });

        return FieldString;
    }
);