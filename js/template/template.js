/*global window*/

(function (win) {
    'use strict';

    var simpleTokens;

    simpleTokens = function (string) {
        var tokens = [],
            index = 0,
            lastIndex = 0,
            length = string.length,
            open = '<%',
            close = '%>';

        while (lastIndex < length) {
            index = string.indexOf(open, lastIndex);

            if (-1 === index) {
                tokens.push({
                    type: 'text',
                    value: string.slice(lastIndex, length)
                });
                lastIndex = length;
            } else {
                // find close tag
                lastIndex = index;
                index = string.indexOf(close, lastIndex);

                if (-1 === index) {
                    throw 'Simple token parse error, no close tag found';
                } else {
                    tokens.push({
                        type: 'script',
                        value: string.slice(lastIndex, index)
                    });

                    lastIndex = index;
                }
            }
        }

        return tokens;
    };

    win.Template = function (string) {
        var tokens = simpleTokens(string);

        window.console.log(tokens);
    };
}(window));