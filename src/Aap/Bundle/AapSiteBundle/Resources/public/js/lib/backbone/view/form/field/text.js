/*global define, window*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    ['lib/backbone/view/abstract'],
    function (AbstractView) {
        'use strict';

        var FieldText = AbstractView.extend({
            initialize: function () {
                console.log('FieldText.initialize');
            }
        });

        return FieldText;
    }
);
