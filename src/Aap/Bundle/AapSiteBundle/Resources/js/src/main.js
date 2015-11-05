/*global*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import {AppKernel} from 'app/AppKernel';
import $ from 'jquery';

$(function () {
    'use strict';

    new AppKernel('development', true);
});