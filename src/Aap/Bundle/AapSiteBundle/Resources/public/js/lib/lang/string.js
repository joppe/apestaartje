/*global define*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    [],
    function () {
        'use strict';

        var TRIM = /^\s+|\s+$/gm,
            SNAKE_CHAR = /_(\w)/g,
            SPINE_CHAR = /-(\w)/g,
            FIRST_CHAR = /(^\w)/g;

        return {
            /**
             * Remove all trailing and leading whitespace of a string
             *
             * @param {string} str
             * @returns {string}
             */
            trim: function (str) {
                return str.replace(TRIM, '');
            },

            /**
             * Transform a snake style to camelcase style
             * snake_style => snakeStyle
             *
             * @param {string} str
             * @returns {string}
             */
            snakeToCamelCase: function (str) {
                return str.toLowerCase().replace(SNAKE_CHAR, function (match, group) {
                    return group.toUpperCase();
                });
            },

            /**
             * Transform spins style to camelcase style
             * spine-style => spineStyle
             *
             * @param {string} str
             * @returns {string}
             */
            spineToCamelCase: function (str) {
                return str.toLowerCase().replace(SPINE_CHAR, function (match, group) {
                    return group.toUpperCase();
                });
            },

            /**
             * Transform the first character of a string to uppercase
             *
             * @param {string} str
             * @returns {string}
             */
            ucfirst: function (str) {
                return str.replace(FIRST_CHAR, function (match, group) {
                    return group.toUpperCase();
                });
            }
        };
    }
);