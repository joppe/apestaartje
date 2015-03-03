/*global define, window*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    [
        'backbone',
        'underscore',
        'lib/lang/class'
    ],
    function (
        Backbone,
        _,
        Class
    ) {
        'use strict';

        var AbstractModel;

        /**
         * @class {AbstractModel}
         */
        AbstractModel = Backbone.Model.extend({
            schema: {
                //string, file, float, int, bool, variant
            },

            parse: function (response) {
                var attributes = {};

                _.each(this.model, function (type, identifier) {
                    var data = response[identifier],
                        model,
                        ClassName;

                    if ('variant' === type || 'string' === type || 'file' === type) {
                        attributes[identifier] = data;
                    } else if ('bool' === type) {
                        attributes[identifier] = true === data;
                    } else if ('float' === type) {
                        data = parseFloat(data);
                        attributes[identifier] = isNaN(data) ? 0 : data;
                    } else if ('int' === type) {
                        data = parseInt(data, 10);
                        attributes[identifier] = isNaN(data) ? 0 : data;
                    } else {
                        model = this.get(identifier);

                        if (model) {
                            model.set(model.parse(data));
                        } else {
                            // the class name must be already available
                            ClassName = Class.resolveClass(window, type);

                            attributes[identifier] = new ClassName(data, {
                                parse: true
                            });
                        }
                    }
                }, this);

                return attributes;
            },

            /**
             * @param {Array} path
             * @returns {*}
             */
            getChild: function (path) {
                return _.reduce(path, function (model, modelName) {
                    var ret = null;

                    if (model) {
                        ret = model.get(modelName);
                    }

                    return ret;
                }, this);
            }
        });

        return AbstractModel;
    }
);
