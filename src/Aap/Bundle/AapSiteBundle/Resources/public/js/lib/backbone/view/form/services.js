/*global define*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    [
        'lib/backbone/view/form/builder',
        'lib/backbone/view/form/field/string',
        'lib/backbone/view/form/field/text',
        'lib/backbone/view/form/field/select',
        'lib/backbone/view/form/field/radio',
        'lib/backbone/view/form/field/checkbox',
        'lib/backbone/view/form/field/submit'
    ],
    function (
        FormBuilder,
        FieldString,
        FieldText,
        FieldSelect,
        FieldRadio,
        FieldCheckbox,
        FieldSubmit
    ) {
        'use strict';

        /**
         * @param {dependencyinjection.Container} di
         */
        return function (services) {
            services
                .register('form.builder', function () {
                    return function (options) {
                        options.services = services;

                        return new FormBuilder(options);
                    };
                }, false)

                .register('form.field.string', function () {
                    return function (options) {
                        options.services = services;

                        return new FieldString(options);
                    };
                }, false)

                .register('form.field.text', function () {
                    return function (options) {
                        options.services = services;

                        return new FieldText(options);
                    };
                }, false)

                .register('form.field.select', function () {
                    return function (options) {
                        options.services = services;

                        return new FieldSelect(options);
                    };
                }, false)

                .register('form.field.radio', function () {
                    return function (options) {
                        options.services = services;

                        return new FieldRadio(options);
                    };
                }, false)

                .register('form.field.checkbox', function () {
                    return function (options) {
                        options.services = services;

                        return new FieldCheckbox(options);
                    };
                }, false)

                .register('form.field.submit', function () {
                    return function (options) {
                        options.services = services;

                        return new FieldSubmit(options);
                    };
                }, false)
            ;
        };
    }
);
