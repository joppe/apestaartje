/*global define, window*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    [
        'lib/backbone/model/abstract',
        'recipes/collection/ingredient'
    ],
    function (
        AbstractModel,
        Ingredients
    ) {
        'use strict';

        var Recipe;

        Recipe = AbstractModel.extend({
            schema: {
                title: 'string',
                thumbnail: 'file',
                text: 'text',
                kitchen: 'string',
                vegetarian: 'bool',
                ingredients: Ingredients
            }
        });

        return Recipe;
    }
);
