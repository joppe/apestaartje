/*global define*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    [
        'underscore',
        'backbone',
        'lib/lang/class',
        'jquery'
    ],
    function (
        _,
        Backbone,
        Class,
        $
    ) {
        'use strict';

        var Connection;

        Connection = Class.createClass({
            /**
             * @param {string} csrf
             */
            setCsrf: function (csrf) {
                this.csrf = csrf;
            }
        });

        _.extend(Connection.prototype, Backbone.Events, {
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

                this.trigger('sync', jqXHR);

                jqXHR = $.ajax({
                    url: url,
                    dataType: 'json',
                    type: method === 'read' ? 'GET' : 'POST',
                    data: method === 'read' ? '' : data,
                    processData: false,
                    contentType: false
                }).done(_.bind(function (response) {
                    if (response.error) {
                        this.trigger('error', response);
                        error(response);
                    } else {
                        success(response.data ? response.data : response);
                    }
                }, this)).fail(_.bind(function (jqXHR, textStatus) {
                    this.trigger('error', textStatus);
                    error(textStatus);
                }, this));

                return jqXHR;
            }
        });

        return Connection;
    }
);