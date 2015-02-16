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

        var FieldString;

        FieldString = AbstractField.extend({
            /**
             * @param {Object} options
             */
            initialize: function (options) {
                Class.callSuper(AbstractField, 'initialize', arguments, this);

                console.log('FieldString.initialize');
            }
        });

        return FieldString;
    }
);