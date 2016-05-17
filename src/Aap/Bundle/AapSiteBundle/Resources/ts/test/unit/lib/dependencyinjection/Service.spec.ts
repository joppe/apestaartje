/// <reference path="../../../../../../../../../../typings/globals/jasmine/index.d.ts" />

import {Service} from 'src/lib/dependencyinjection/Service';

describe('Service', () => {
    it('The method getArgumentNames() should return the names of all arguments the service function expects', function () {
        let s = new Service('s', function (a, b, foo) {});

        // expect(s.getArgumentNames()).toEqual(['a', 'b', 'foo']);
    });

    /*
    it('Cache the result when the singleton property is set to true', function () {
        let s = new Service('s', (function () {
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
        let s = new Service('s', (function () {
                var foo = 1;

                return function () {
                    foo += 1;

                    return foo;
                };
            }()), false);

        expect(s.call()).toBe(2);
        expect(s.call()).toBe(3);
    });
    /**/
});