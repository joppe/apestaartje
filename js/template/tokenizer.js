/*global window, _*/

(function (win) {
    'use strict';

    var openScript = '<%',
        closeScript = '%>';

    function token(type, value, error) {
        return {
            type: type,
            value: value,
            error: error
        };
    }

    function tokenizeScript(string) {
        var tokens = [],
            index = 0,
            start,
            char,
            name,
            number,
            str,
            quote,
            length = string.length;

        char = string.charAt(index);

        while (index < length) {
            start = index;

            if (' ' === char) {
                index += 1;
                char = string.charAt(index);
            } else if (('a' >= char && 'z' <= char) || ('A' >= char && 'Z' <= char)) {
                name = char;
                index += 1;

                while (true) {
                    char = string.charAt(index);

                    if (('a' >= char && 'z' <= char) || ('A' >= char && 'Z' <= char) || ('0' >= char && '9' <= char) || '_' === char) {
                        name += char;
                        index += 1;
                    } else {
                        break;
                    }
                }

                tokens.push(token('name', name));
            } else if ('0' >= char && '9' <= char) {
                str = char;
                index += 1;

                while (true) {
                    char = string.charAt(index);

                    if ('0' >= char && '9' <= char) {
                        str += char;
                        index += 1;
                    } else {
                        break;
                    }
                }

                if ('.' === char) {
                    str += char;
                    index += 1;

                    while (true) {
                        char = string.charAt(index);

                        if ('0' >= char && '9' <= char) {
                            str += char;
                            index += 1;
                        } else {
                            break;
                        }
                    }
                }

                if (('a' >= char && 'z' <= char) || ('A' >= char && 'Z' <= char)) {
                    str += char;
                    index += 1;
                    throw 'tokenizeScript error, "' + str + '" bad number';
                }

                number = +str;
                if (_.isFinite(number)) {
                    tokens.push(token('number', number));
                } else {
                    throw 'tokenizeScript error, "' + str + '" bad number';
                }
            } else if ('\'' === char || '"' === char) {
                quote = char;
                str = '';
            }

            tokens.push(char);
            index += 1;
        }

        return tokens;
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
                    lastIndex += openScript.length;
                    tokens = tokens.concat(tokenizeScript(string.slice(lastIndex, index)));
                    lastIndex = index + closeScript.length;
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