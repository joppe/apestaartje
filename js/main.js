/*global window, jQuery, Template*/

jQuery(function ($) {
    'use strict';

    //var t = new Template('<p>Hello World!</p>');
    var t = new Template('<h1><%= title %></h1><p><%= text %></p>');

    window.console.log(t);
});