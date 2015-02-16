/*global define, window*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    [
        'lib/lang/class',
        'lib/backbone/view/abstract'
    ],
    function (
        Class,
        AbstractView
    ) {
        'use strict';

        var Field;

        Field = AbstractView.extend({
            /**
             * @param {Object} options
             */
            initialize: function (options) {
                Class.callSuper(AbstractView, 'initialize', arguments, this);

                this.property = options.property;
                console.log(this.property);
            },

            /**
             * @returns {string|number}
             */
            identifier: function () {
                return this.property + '_' + this.model.cid;
            }
        });

        return Field;
    }
);
