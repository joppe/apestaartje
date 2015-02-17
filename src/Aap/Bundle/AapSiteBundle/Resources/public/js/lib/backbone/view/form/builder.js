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
            className: 'form',

            /**
             * @param {Object} options
             */
            initialize: function (options) {
                Class.callSuper(AbstractView, 'initialize', arguments, this);

                this.services = options.services;
            },

            /**
             * Add a check if in path is no slash prefix path with 'lib/backbone/view/form/field/'
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
