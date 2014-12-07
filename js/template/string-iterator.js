/*global*/

(function (win) {
    'use strict';

    var getChar,
        isValid;

    getChar = function (string, pos, length) {
        var char = false;

        if (isValid(pos, length)) {
            char = string.charAt(pos);
        }

        return char;
    };

    isValid = function (pos, length) {
        return pos < length;
    };

    win.StringIterator = {
        create: function (string) {
            var pos = 0,
                length = string.length,
                char = getChar(string, pos, length);

            return {
                current: function () {
                    return char;
                },

                next: function () {
                    pos += 1;

                    char = getChar(string, pos, length);

                    return char;
                },

                peek: function (offset) {
                    offset = offset === undefined ? 1 : offset;

                    return getChar(string, pos + offset, length);
                },

                valid: function (pos) {
                    return isValid(pos, length);
                },

                key: function () {
                    return pos;
                },

                rewind: function () {
                    pos = 0;

                    return this;
                },

                length: function () {
                    return length;
                }
            };
        }
    };
}(window));