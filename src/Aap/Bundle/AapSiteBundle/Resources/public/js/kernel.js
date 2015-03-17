/*global define*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    [
        'lib/dependencyinjection/container',
        'lib/backbone/view/template',
        'lib/backbone/view/form/services'
    ],
    function (
        di,
        template,
        formExtension
    ) {
        'use strict';

        var services = di.create();

        services.register('template', function () {
            return template;
        }, true);

        formExtension(services);

        return {
            getServices: function () {
                return services;
            }
        };
    }
);