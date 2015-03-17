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
                'kernel',
                'lib/lang/class',
                'lib/backbone/model/loader'
            ],
            function (
                Backbone,
                $,
                Kernel,
                Class,
                modelLoader
            ) {
                var services = Kernel.getServices(),
                    form,
                    model;

                window.model = model = new Backbone.Model({
                    title: 'This is the title',
                    intro: '',
                    text: 'Dummy text',
                    vehicle: '',
                    accessoires: new Backbone.Collection(),
                    color: null,
                    thumbnail: null
                });

                form = services.get('form.builder')({
                    model: model
                });
                form.add('title', 'form.field.string', {});
                form.add('intro', 'form.field.text', {});
                form.add('vehicle', 'form.field.select', {
                    options: [
                        {id: 'car', label: 'Car'},
                        {id: 'plane', label: 'Plane'},
                        {id: 'boat', label: 'Boat'},
                        {id: 'bicycle', label: 'Bicycle'}
                    ],
                    defaultValue: 'bicycle'
                });
                form.add('thumbnail', 'form.field.file', {});
                form.add('text', 'form.field.text', {
                    template: '<h1><%= label %></h1>'
                });
                form.add('color', 'form.field.radio', {
                    options: [
                        {id: 'red', label: 'Red'},
                        {id: 'green', label: 'Green'},
                        {id: 'blue', label: 'Blue'}
                    ]
                });
                form.add('accessoires', 'form.field.checkbox', {
                    options: [
                        {id: 'airco', label: 'Airco'},
                        {id: 'navigation', label: 'Navigation'},
                        {id: 'airbag', label: 'Airbag'},
                        {id: 'parc-assist', label: 'Parc assist'}
                    ]
                });
                form.add('send', 'form.field.submit', {});

                $('body').append(form.render().el);

                // check if the modelLoader works
                modelLoader('foo', {
                    foo: 'lib/lang/class',
                    bar: 'backbone'
                }, function (model) {
                    console.log(model);
                });
            }
        );
    }
);