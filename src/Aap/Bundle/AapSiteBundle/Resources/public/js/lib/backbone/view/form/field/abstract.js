/*global define, window*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    [
        'underscore',
        'lib/lang/class',
        'lib/backbone/view/abstract'
    ],
    function (
        _,
        Class,
        AbstractView
    ) {
        'use strict';

        var Field;

        Field = AbstractView.extend({
            className: 'form-group',

            /**
             * @param {Object} options
             */
            initialize: function (options) {
                Class.callSuper(AbstractView, 'initialize', arguments, this);

                this.property = options.property;
                this.services = options.services;
                this.label = undefined !== options.label ? options.label : this.property;
                this.id = this.property + '-' + this.model.cid;
                this.placeholder = undefined !== options.placeholder ? options.placeholder : '';

                this.listenTo(this.model, 'change:' + this.property, _.bind(this.update, this));
            },

            /**
             * @returns {string|number}
             */
            identifier: function () {
                return this.property + '_' + this.model.cid;
            },

            update: function () {

            },

            render: function () {
                this.$el.html(this.template({
                    id: this.id,
                    name: this.property,
                    label: this.label,
                    placeholder: this.placeholder,
                    value: this.model.get(this.property)
                }));

                return this;
            }
        });

        return Field;
    }
);
