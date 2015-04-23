/*global describe, it, expect*/

import {Service} from 'lib/dependencyinjection/Service';

describe('Service', function () {
    'use strict';

    it('The method getArgumentNames() should return the names of all arguments the service function expects', function () {
        let s = new Service(function (a, b, foo) {});

        expect(s.getArgumentNames()).toEqual(['a', 'b', 'foo']);
    });

    it('Cache the result when the singleton property is set to true', function () {
        let s = new Service((function () {
                var foo = 1;

                return function () {
                    foo += 1;

                    return foo;
                };
            }()), true);

        expect(s.call()).toBe(2);
        expect(s.call()).toBe(2);
    });

    it('Do not cache the result when the singleton property is set to false', function () {
        let s = new Service((function () {
                var foo = 1;

                return function () {
                    foo += 1;

                    return foo;
                };
            }()), false);

        expect(s.call()).toBe(2);
        expect(s.call()).toBe(3);
    });
});