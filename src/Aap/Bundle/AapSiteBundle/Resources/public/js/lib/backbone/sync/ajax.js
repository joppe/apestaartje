/*global define*/

define(
    [
        'underscore',
        'jquery'
    ],
    function (_, $) {
        'use strict';

        return function (csrf, onerror) {
            onerror = onerror || function () {};

            /**
             * @param {string} method
             * @param {Backbone,Model} model
             * @param {Object} options
             */
            return function (method, model, options) {
                var success = options.success || function () {},
                    error = options.error || function () {},
                    url = model.url(),
                    data = {
                        csrf: csrf,
                        data: _.isFunction(model.prepare) ? model.prepare() : model.attributes
                    };

                if (csrf && method === 'read') {
                    url += '?csrf=' + csrf;
                }

                $.ajax({
                    url: url,
                    type: method === 'read' ? 'GET' : 'POST',
                    data: method === 'read' ? '' : data,
                    success: function (response) {
                        if (response.error) {
                            onerror(response.error);
                            error(response);
                        } else {
                            success(response.data ? response.data : response);
                        }
                    },
                    error: function (response) {
                        onerror(response.error);
                        error(response);
                    }
                });
            };
        };
    }
);