/*global window*/

import {AppKernel} from 'app/AppKernel';

$(function () {
    'use strict';

    let app = new AppKernel('development', true);

    app.init();
    app.boot();
});