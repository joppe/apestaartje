/*global define, describe, jasmine, it, expect*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

define(
    ['lib/request/uri-parser'],
    function (UriParser) {
        'use strict';

        describe('UriParser', function () {

            it('to parse an uri and get the variable names and values', function () {
                var u = new UriParser({
                        param: '/',
                        keyValue: '=',
                        value: ','
                    });

                expect(u.parseUri('a=1/b=2/c=3,4')).toEqual({
                    a: ['1'],
                    b: ['2'],
                    c: ['3', '4']
                });
            });

        });

    }
);