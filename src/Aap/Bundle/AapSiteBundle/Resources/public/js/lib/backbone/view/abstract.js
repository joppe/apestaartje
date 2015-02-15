/*global define, window*/

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
             * @param {Backbone.View} child
             * @returns {AbstractView}
             */
            addChild: function (child) {
                this.children[child.model.id()] = child;

                return this;
            },

            /**
             * @param {Backbone.View} child
             * @returns {AbstractView}
             */
            removeChild: function (child) {
                child.remove();

                delete this.children[child.model.id()];

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
