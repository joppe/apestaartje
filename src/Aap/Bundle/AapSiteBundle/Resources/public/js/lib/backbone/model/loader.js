/*global define, require*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

/**
 * TODO make the loader chainable
 */
define(
    [
        'underscore',
        'lib/backbone/model/abstract'
    ],
    function (_, AbstractModel) {
        'use strict';

        var cache = {};

        return function (name, schema, ready) {
            var files = _.values(schema),
                definitions = _.keys(schema);

            if (undefined === cache[name]) {
                require(files, function () {
                    var schema = {};

                    _.each(arguments, function (argument, index) {
                        schema[definitions[index]] = argument;
                    });

                    cache[name] = AbstractModel.extend({
                        schema: schema
                    });
                });
            } else {
                ready(cache[name]);
            }
        };
    }
);