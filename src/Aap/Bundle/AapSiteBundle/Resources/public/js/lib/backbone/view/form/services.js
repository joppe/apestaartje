/*global define*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    [
        'lib/backbone/view/form/builder',
        'lib/backbone/view/form/field/string',
        'lib/backbone/view/form/field/text'
    ],
    function (
        FormBuilder,
        FieldString,
        FieldText
    ) {
        'use strict';

        /**
         * @param {dependencyinjection.Container} di
         */
        return function (services) {
            services
                .register('form', function () {
                    return function (options) {
                        options.di = services;

                        return new FormBuilder(options);
                    };
                }, false)

                .register('form.string', function () {
                    return function (options) {
                        options.di = services;

                        return new FieldString(options);
                    };
                }, false)

                .register('form.text', function () {
                    return function (options) {
                        options.di = services;

                        return new FieldText(options);
                    };
                }, false)
            ;
        };
    }
);
