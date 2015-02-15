/*global define*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    ['require', 'lib/backbone/view/abstract'],
    function (require, AbstractView) {
        'use strict';

        var FormBuilder;

        FormBuilder = AbstractView.extend({
            initialize: function () {
                this.fields = {};
            },

            add: function (identifier, type, options) {
                return this;
            },

            render: function () {

            }
        });

        return FormBuilder;
    }
);
