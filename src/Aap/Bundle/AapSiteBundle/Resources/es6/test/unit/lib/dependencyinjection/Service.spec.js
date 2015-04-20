/*global describe, it, expect*/

import {Service} from 'lib/dependencyinjection/Service';

describe('Service', function () {
    it('provide the argument names the service function expects', function () {
        let s = new Service(function (a, b, foo) {});

        expect(s.getArgumentNames()).toEqual(['a', 'b', 'foo']);
    });
});