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
        'lib/backbone/view/form/field/submit'
    ],
    function (
        FormBuilder,
        FieldString,
        FieldText,
        FieldSelect,
        FieldRadio,
        FieldSubmit
    ) {
        'use strict';

        /**
         * @param {dependencyinjection.Container} di
         */
        return function (services) {
            services
                .register('form', function () {
                    return function (options) {
                        options.services = services;

                        return new FormBuilder(options);
                    };
                }, false)

                .register('form.string', function () {
                    return function (options) {
                        options.services = services;

                        return new FieldString(options);
                    };
                }, false)

                .register('form.text', function () {
                    return function (options) {
                        options.services = services;

                        return new FieldText(options);
                    };
                }, false)

                .register('form.select', function () {
                    return function (options) {
                        options.services = services;

                        return new FieldSelect(options);
                    };
                }, false)

                .register('form.radio', function () {
                    return function (options) {
                        options.services = services;

                        return new FieldRadio(options);
                    };
                }, false)

                .register('form.submit', function () {
                    return function (options) {
                        options.services = services;

                        return new FieldSubmit(options);
                    };
                }, false)
            ;
        };
    }
);
