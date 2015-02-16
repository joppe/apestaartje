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
        return function (di) {
            di
                .register('form', function () {
                    return function (options) {
                        options.di = di;

                        return new FormBuilder(options);
                    };
                }, false)

                .register('form.string', function () {
                    return function (options) {
                        options.di = di;

                        return new FieldString(options);
                    };
                }, false)

                .register('form.text', function () {
                    return function (options) {
                        options.di = di;

                        return new FieldText(options);
                    };
                }, false)
            ;
        };
    }
);
