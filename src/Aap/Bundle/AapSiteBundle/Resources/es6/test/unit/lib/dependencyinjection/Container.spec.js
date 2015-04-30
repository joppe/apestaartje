/*global describe, it, expect*/

import {Container} from 'lib/dependencyinjection/Container';
import {Service} from 'lib/dependencyinjection/Service';
import {Exception} from 'lib/exception/Exception';

describe('Container', function () {
    'use strict';

    it('Should be possible to register a service and return itself', function () {
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

    it('Create an alias of an existing service', function () {
        let c = new Container(),
            f = function () {};

        c.register('foo', f);
        c.alias('foobar', 'foo');

        expect(c.has('foo')).toBe(true);
        expect(c.has('foobar')).toBe(true);
    });

    it('Cannot create an alias if the name is already used', function () {
        let c = new Container(),
            f = function () {};

        c.register('foo', f);
        c.alias('foobar', 'foo');

        expect(function () {
            c.alias('foobar', 'foo');
        }).toThrow(new Exception('Service/alias "foobar" already exists'));
    });

    it('Resolve an alias to the name of the service', function () {
        let c = new Container(),
            f = function () {};

        c.register('foo', f);
        c.alias('foobar', 'foo');

        expect(c.resolve('foobar')).toBe('foo');
    });

    it('Get a defined service by name', function () {
        let c = new Container(),
            f = function () {
                return 2;
            };

        c.register('foo', f);

        expect(c.get('foo')).toBe(2);
    });

    it('Get a defined service by alias', function () {
        let c = new Container(),
            f = function () {
                return 2;
            };

        c.register('foo', f);
        c.alias('foobar', 'foo');

        expect(c.get('foobar')).toBe(2);
    });

    it('Get the service instance by calling the findDefinition method', function () {
        let c = new Container(),
            f = function () {
                return 2;
            },
            s;

        c.register('foo', f);
        s = c.findDefinition('foo');

        expect(s instanceof Service).toBe(true);
        expect(s.call()).toBe(2);
    });

    it('Arguments of a service are also service definitions', function () {
        let c = new Container(),
            a = function () {
                return 4;
            },
            f = function (a) {
                return 2 * a;
            };

        c.register('foo', f);
        c.register('a', a);

        expect(c.get('foo')).toBe(8);
    });

    it('A service can be tagged', function () {
        let c = new Container();

        c.register('foo', function (a) {
            return 2 * a;
        }, true, 'test');
        c.register('a', function () {
            return 4;
        });
        c.register('bar', function () {
            return 'bar';
        }, true, 'test');

        expect(c.findTaggedServiceIds('test')).toEqual(['bar', 'foo']);
    });
});