/*global define*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    [
        'underscore',
        'backbone',
        'jquery'
    ],
    function (
        _,
        Backbone,
        $
    ) {
        'use strict';

        var Sync;

        Sync = function (csrf) {
            this.csrf = csrf;
        };

        _.extend(Sync.prototype, Backbone.Events, {
            /**
             * @param {string} method
             * @param {Backbone,Model} model
             * @param {Object} options
             */
            sync: function (method, model, options) {
                var jqXHR,
                    success = options.success || function () {},
                    error = options.error || function () {},
                    url = model.url(),
                    data = {
                        csrf: this.csrf,
                        data: _.isFunction(model.getData) ? model.getData() : model.attributes
                    };

                if (this.csrf && method === 'read') {
                    url += '?csrf=' + this.csrf;
                }

                jqXHR = $.ajax({
                    url: model.get('url'),
                    dataType: 'json',
                    type: method === 'read' ? 'GET' : 'POST',
                    data: method === 'read' ? '' : data
                })
                .done(_.bind(function (response) {
                    if (response.error) {
                        this.trigger('error', response);
                        error(response);
                    } else {
                        success(response.data ? response.data : response);
                    }
                }, this))
                .fail(_.bind(function (jqXHR, textStatus) {
                    this.trigger('error', textStatus);
                    error(textStatus);
                }, this));

                return jqXHR;
            }
        });

        return Sync;
    }
);