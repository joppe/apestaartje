/*global window, _*/

(function (win) {
    'use strict';

    var openScript = '<%',
        closeScript = '%>';

    function token(type, value) {
        return {
            type: type,
            value: value
        };
    }
    
    function tokenizeTemplate(string) {
        var tokens = [],
            index = 0,
            lastIndex = 0,
            length = string.length;

        while (lastIndex < length) {
            index = string.indexOf(openScript, lastIndex);

            if (-1 === index) {
                tokens.push(token('html', string.slice(lastIndex, length)));
                lastIndex = length;
            } else {
                if (lastIndex !== index) {
                    tokens.push(token('html', string.slice(lastIndex, index)));
                }

                lastIndex = index;
                index = string.indexOf(closeScript, lastIndex);

                if (-1 === index) {
                    throw 'tokenizeTemplate error, no close tag found';
                } else {
                    index += closeScript.length;
                    tokens.push(token('script', string.slice(lastIndex, index)));
                    lastIndex = index;
                }
            }
        }

        return tokens;
    }

    win.Tokenizer = {
        tokenize: function (string) {
            return tokenizeTemplate(string);
        }
    };
}(window));