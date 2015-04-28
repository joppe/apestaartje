/*global*/

import {AppKernel} from 'app/AppKernel';
import $ from 'jquery';

$(function () {
    'use strict';

    let app = new AppKernel('development');
    app.boot();
});