/*global jQuery, Template*/

jQuery(function ($) {
    'use strict';

    //var t = new Template('<p>Hello World!</p>');
    var t = new Template('<p><%= title %></p>');

    console.log(t);
});