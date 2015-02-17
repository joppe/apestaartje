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
                    form,
                    model;

                window.model = model = new Backbone.Model({
                    title: 'This is the title',
                    text: 'Dummy text'
                });

                services.register('template', function () {
                    return template;
                }, true);

                formExtension(services);

                form = services.get('form')({
                    model: model
                });
                form.add('title', 'form.string', {});
                form.add('intro', 'form.text', {});
                form.add('vehicle', 'form.select', {
                    options: [
                        {id: 'car', label: 'Car'},
                        {id: 'plane', label: 'Plane'},
                        {id: 'boat', label: 'Boat'},
                        {id: 'bicycle', label: 'Bicycle'}
                    ],
                    defaultValue: 'bicycle'
                });
                form.add('text', 'form.text', {
                    template: '<h1><%= label %></h1>'
                });
                form.add('send', 'form.submit', {});

                $('body').append(form.render().el);
            }
        );
    }
);