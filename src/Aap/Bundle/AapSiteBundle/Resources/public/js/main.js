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
                'lib/dependencyinjection/container',
                'lib/lang/class',
                'lib/backbone/view/form/extension'
            ],
            function (
                Backbone,
                $,
                Di,
                Class,
                formExtension
            ) {
                var services = new Di(),
                    form;

                formExtension(services);

                form = services.get('form')({
                    model: new Backbone.Model()
                });
                form.add('title', 'form.string', {});
                form.add('intro', 'form.text', {});
                form.add('text', 'form.text', {});

                $('body').append(form.render().el);
                console.log(form);
            }
        );
    }
);