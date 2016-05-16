/*global describe, it, expect*/

import {Container} from 'lib/dependencyinjection/Container';

describe('Container', function () {
    'use strict';

    it('Should be possible to register a service and return itself', function () {
        let c = new Container(),
            f = function () {};

        expect(c.register('foo', f)).toBe(c);
    });
});