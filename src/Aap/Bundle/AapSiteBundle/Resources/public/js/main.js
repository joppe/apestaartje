/*global require, console*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

require(
    ['config'],
    function() {
    'use strict';

        var s = 'lib/backbone/view/form/builder';
        require(
        [s],
        function (FormBuilder) {
            var builder = new FormBuilder();

            console.log(builder);
        }
    );
});