/*global define*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    ['backbone', 'underscore'],
    function (Backbone, _) {
        'use strict';

        var AbstractView;

        /**
         * @class {AbstractView}
         */
        AbstractView = Backbone.View.extend({
            /**
             * @constructs
             */
            initialize: function () {
                this.children = {};
            },

            /**
             * @returns {string|number}
             */
            identifier: function () {
                return this.model.id;
            },

            /**
             * @param {AbstractView} child
             * @returns {AbstractView}
             */
            addChild: function (child) {
                this.children[child.identifier()] = child;

                return this;
            },

            /**
             * @param {AbstractView} child
             * @returns {AbstractView}
             */
            removeChild: function (child) {
                child.remove();

                delete this.children[child.identifier()];

                return this;
            },

            /**
             * @returns {AbstractView}
             */
            render: function () {
                _.each(this.children, function (child) {
                    this.$el.append(child.render().$el);
                }, this);

                return this;
            },

            /**
             * @returns {AbstractView}
             */
            remove: function () {
                _.each(this.children, function (child) {
                    this.removeChild(child);
                }, this);

                this.stopListening();
                this.$el.remove();
            }
        });

        return AbstractView;
    }
);
