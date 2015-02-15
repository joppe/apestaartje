/*global define, window*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    ['lib/backbone/view/abstract'],
    function (AbstractView) {
        'use strict';

        var FieldString = AbstractView.extend({
            initialize: function () {

            }
        });

        return FieldString;
    }
);
