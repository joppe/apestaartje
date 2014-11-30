/*global window, Tokenizer*/

(function (win) {
    'use strict';

    win.Template = function (string) {
        var tokens = Tokenizer.tokenize(string);

        window.console.log(tokens);
    };
}(window));