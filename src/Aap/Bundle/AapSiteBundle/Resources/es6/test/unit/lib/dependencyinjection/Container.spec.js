/*global describe, it, expect*/

import {Container} from 'lib/dependencyinjection/Container';
import {Exception} from 'lib/exception/Exception';

describe('Container', function () {
    'use strict';

    it('Should be possible to register a service and return itself', function () {
        var c = new Container(),
            f = function () {};

        expect(c.register('foo', f)).toBe(c);
    });

    it('Check if a service exists', function () {
        var c = new Container(),
            f = function () {};

        c.register('foo', f);

        expect(c.has('foo')).toBe(true);
        expect(c.has('foobar')).toBe(false);
    });

    it('Create an alias of an existing service', function () {
        var c = new Container(),
            f = function () {};

        c.register('foo', f);
        c.alias('foobar', 'foo');

        expect(c.has('foo')).toBe(true);
        expect(c.has('foobar')).toBe(true);
    });

    it('Cannot create an alias if the name is already used', function () {
        var c = new Container(),
            f = function () {};

        c.register('foo', f);
        c.alias('foobar', 'foo');

        expect(function () {
            c.alias('foobar', 'foo');
        }).toThrow(new Exception('Service/alias "foobar" already exists'));
    });

    it('Resolve an alias to the name of the service', function () {
        var c = new Container(),
            f = function () {};

        c.register('foo', f);
        c.alias('foobar', 'foo');

        expect(c.resolve('foobar')).toBe('foo');
    });

    it('Get a defined service by name', function () {
        var c = new Container(),
            f = function () {
                return 2;
            };

        c.register('foo', f);

        expect(c.get('foo')).toBe(2);
    });

    it('Get a defined service by alias', function () {
        var c = new Container(),
            f = function () {
                return 2;
            };

        c.register('foo', f);
        c.alias('foobar', 'foo');

        expect(c.get('foobar')).toBe(2);
    });
});