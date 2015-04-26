/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import Backbone from 'backbone';

/**
 * @class AbstractModel
 */
export class AbstractModel extends Backbone.Model {
    /**
     * Parse the data
     *
     * @param {Object} response
     * @returns {Object}
     */
    parse(response) {
        let attributes = {};

        _.each(this.constructor.schema, function (type, property) {
            var value = response[property],
                model,
                ClassName;

            if ('variant' === type || 'text' === type || 'string' === type || 'file' === type) {
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
    }

    /**
     * @returns {Object}
     */
    getData() {
        let data = new FormData();

        _.each(this.constructor.schema, function (type, property) {
            if (true === _.contains(['string', 'file', 'float', 'int', 'bool', 'variant'], type)) {
                data.append(property, this.get(property));
            } else {
                // todo: delegate retrieval of data to sub model
                //data.append(property, this.get(property));
            }
        }, this);

        return data;
    }

    /**
     * @param {Array} path
     * @returns {*}
     */
    getChild(path) {
        return _.reduce(path, function (model, modelName) {
            let ret = null;

            if (model) {
                ret = model.get(modelName);
            }

            return ret;
        }, this);
    }

    /**
     * @returns {string}
     */
    url() {
        return '/crud';
    }
}

AbstractModel.schema = {
    //string, file, float, int, bool, variant
};
