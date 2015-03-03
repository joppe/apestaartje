/*global define*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    [
        'backbone',
        'underscore'
    ],
    function (
        Backbone,
        _
    ) {
        'use strict';

        var AbstractModel;

        AbstractModel = Backbone.Model.extend({
            schema: {
                //string, file, float, int, bool, variant
            },

            parse: function (response) {
                var attributes = {};

                _.each(this.schema, function (type, property) {
                    var value = response[property],
                        model,
                        ClassName;

                    if ('variant' === type || 'string' === type || 'file' === type) {
                        attributes[property] = value;
                    } else if ('float' === type) {
                        value = parseFloat(value);
                        attributes[property] = isNaN(value) ? 0 : value;
                    } else if ('int' === type) {
                        value = parseInt(value, 10);
                        attributes[property] = isNaN(value) ? 0 : value;
                    } else if ('bool' === type) {
                        attributes[property] = (true === value);
                    } else {
                        model = this.get(property);

                        if (model) {
                            model.set(model.parse(value));
                        } else {
                            ClassName = type;

                            attributes[property] = new ClassName(value, {
                                parse: true
                            });
                        }
                    }
                }, this);

                return attributes;
            },

            /**
             * @returns {Object}
             */
            getData: function () {
                return this.attributes;
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