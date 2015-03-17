/*global define*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    [
        'backbone',
        'lib/dependencyinjection/container',
        'lib/backbone/view/template',
        'lib/backbone/connection',
        'lib/backbone/view/form/services'
    ],
    function (
        Backbone,
        di,
        template,
        Connection,
        formExtension
    ) {
        'use strict';

        var services = di.create();

        services.register('template', function () {
            return template;
        }, true);

        services.register('connection', function () {
            return new Connection();
        }, true);

        formExtension(services);

        /**
         * Override backbone's sync method
         *
         * @param {string} method
         * @param {Backbone,Model} model
         * @param {Object} options
         */
        Backbone.sync = function (method, model, options) {
            return services.get('connection').sync(method, model, options);
        };

        return {
            getServices: function () {
                return services;
            }
        };
    }
);