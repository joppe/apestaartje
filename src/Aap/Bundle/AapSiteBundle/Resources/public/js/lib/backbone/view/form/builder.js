/*global define*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    [
        'require',
        'underscore',
        'lib/lang/class',
        'lib/backbone/view/abstract'
    ],
    function (
        require,
        _,
        Class,
        AbstractView
    ) {
        'use strict';

        var FormBuilder;

        FormBuilder = AbstractView.extend({
            className: 'form',

            initialize: function () {
                Class.callSuper(AbstractView, 'initialize', arguments, this);

                this.fields = {};
            },

            /**
             * Add a check if in path is no slash prefix path with 'lib/backbone/view/form/field/'
             *
             * @param {string} identifier
             * @param {string} path
             * @param {Object} options
             * @returns {FormBuilder}
             */
            add: function (identifier, path, options) {
                options.model = this.model;

                this.fields[identifier] = {
                    path: path,
                    options: options
                };

                return this;
            },

            /**
             * The problem is that the files with the type definitions must be loaded by requirejs. This is a
             * asynchronous process.
             *
             * @returns {FormBuilder}
             */
            render: function () {
                var identifiers = _.keys(this.fields),
                    paths = _.map(identifiers, function (identifier) {
                        return this.fields[identifier].path;
                    }, this);

                require(paths, _.bind(function () {
                    var fieldClasses = arguments;

                    _.each(identifiers, _.bind(function (identifier, index) {
                        var FieldClass = fieldClasses[index],
                            field = new FieldClass(this.fields[identifier].options);

                        this.addChild(field);
                        this.$el.append(field.render().el);

                    }, this));
                }, this));

                return this;
            }
        });

        return FormBuilder;
    }
);
