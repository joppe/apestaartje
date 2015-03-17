/*global define, window*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    [
        'backbone',
        'recipes/model/ingredient'
    ],
    function (
        Backbone,
        Ingredient
    ) {
        'use strict';

        var Ingredients;

        Ingredients = Backbone.Collection.extend({
            model: Ingredient
        });

        return Ingredients;
    }
);
