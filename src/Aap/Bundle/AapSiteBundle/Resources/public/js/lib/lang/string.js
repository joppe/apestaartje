/*global define*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    [],
    function () {
        'use strict';

        var LTRIM = /^\s+/g,
            RTRIM = /\s+$/g,
            SNAKE_CHAR = /_(\w)/g,
            SPINE_CHAR = /-(\w)/g,
            FIRST_CHAR = /(^\w)/g;

        return {
            PAD_LEFT: 1,
            PAD_RIGHT: 2,

            /**
             * Removing leading whitespace
             *
             * @param {string} str
             * @returns {string}
             */
            ltrim: function (str) {
                return str.replace(LTRIM, '');
            },

            /**
             * Removing trailing whitespace
             *
             * @param {string} str
             * @returns {string}
             */
            rtrim: function (str) {
                return str.replace(RTRIM, '');
            },

            /**
             * Remove all trailing and leading whitespace of a string
             *
             * @param {string} str
             * @returns {string}
             */
            trim: function (str) {
                return this.rtrim(this.ltrim(str));
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
            },

            /**
             * @param {string} str
             * @param {number} length
             * @param {string} char
             * @param {number} [direction]
             * @returns {string}
             */
            pad: function (str, length, char, direction) {
                var padLength = length - str.length,
                    padString = '';

                direction = direction || this.PAD_LEFT;

                if (padLength === 1) {
                    padString = char;
                } else if (padLength > 1) {
                    padString = new Array(padLength + 1).join(char);
                }

                if (direction === this.PAD_LEFT) {
                    str = padString + str;
                } else if (direction === this.PAD_RIGHT) {
                    str += padString;
                }

                return str;
            }
        };
    }
);