/*global define*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    [
        'require',
        'underscore',
        'lib/lang/class',
        'lib/backbone/view/abstract'
    ],
    function (
        require,
        _,
        Class,
        AbstractView
    ) {
        'use strict';

        var FormBuilder;

        FormBuilder = AbstractView.extend({
            tagName: 'form',

            className: 'form-horizontal form',

            /**
             * @param {Object} options
             */
            initialize: function (options) {
                var sync;

                Class.callSuper(AbstractView, 'initialize', arguments, this);

                this.services = options.services;

                sync = this.services.get('sync');
                console.log(this.services);
                this.model.sync = function (method, model, options) {
                    sync.sync(method, model, options);
                };
            },

            /**
             * Add a field
             *
             * @param {string} property
             * @param {string} type
             * @param {Object} options
             * @returns {FormBuilder}
             */
            add: function (property, type, options) {
                options.model = this.model;
                options.property = property;

                this.addChild(this.services.get(type)(options));

                return this;
            }
        });

        return FormBuilder;
    }
);
