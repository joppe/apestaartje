/*global define, window*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    [
        'lib/backbone/model/abstract'
    ],
    function (
        AbstractModel
    ) {
        'use strict';

        var Ingredient;

        Ingredient = AbstractModel.extend({
            schema: {
                name: 'string'
            }
        });

        return Ingredient;
    }
);
