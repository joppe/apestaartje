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
                'lib/backbone/view/template',
                'lib/backbone/view/form/services'
            ],
            function (
                Backbone,
                $,
                Di,
                Class,
                template,
                formExtension
            ) {
                var services = new Di(),
                    form;

                services.register('template', function () {
                    return template;
                }, true);

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