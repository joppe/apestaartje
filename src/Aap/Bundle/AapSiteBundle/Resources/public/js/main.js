/*global require, console*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

require(
    ['config'],
    function() {
        'use strict';

        require(
            [
                'backbone',
                'jquery',
                'lib/backbone/view/form/builder'
            ],
            function (
                Backbone,
                $,
                FormBuilder
            ) {
                var options = {
                        model: new Backbone.Model()
                    },
                    builder = new FormBuilder(options);

                builder.add('title', 'lib/backbone/view/form/field/string', {});
                builder.add('text', 'lib/backbone/view/form/field/text', {});
                builder.add('subtitle', 'lib/backbone/view/form/field/string', {});

                $('body').append(builder.render().el);

                console.log(builder);
            }
        );
    }
);