/*global define, window*/

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

        var FieldSubmit,
            template = '' +
                '<div class="col-sm-offset-2 col-sm-10">' +
                    '<button type="submit" class="btn btn-default"><%= label %></button>' +
                '</div>';

        FieldSubmit = AbstractField.extend({
            /**
             * @param {Object} options
             */
            initialize: function (options) {
                Class.callSuper(AbstractField, 'initialize', arguments, this);

                this.setTemplate('field-submit', template, options.template);
            }
        });

        return FieldSubmit;
    }
);