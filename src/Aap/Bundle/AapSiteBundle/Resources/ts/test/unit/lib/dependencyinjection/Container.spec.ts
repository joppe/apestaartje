/// <reference path="../../../../../../../../../../typings/globals/jasmine/index.d.ts" />

import {Container} from 'src/lib/dependencyinjection/Container';

describe('Container', () => {
    it('Should be possible to register a service and return itself', () => {
        let c = new Container(),
            f = function () {};

        expect(c.register('foo', f)).toBe(c);
    });

    it('Check if a service exists', function () {
        let c = new Container(),
            f = function () {};

        c.register('foo', f);

        expect(c.has('foo')).toBe(true);
        expect(c.has('foobar')).toBe(false);
    });
});
