/// <reference path="../../../../../../../../../../typings/globals/jasmine/index.d.ts" />

import {Container} from 'src/lib/dependencyinjection/Container';

describe('Container.register', () => {
    it('Should be possible to register a service and return itself', () => {
        let c = new Container(),
            f = function () {};

        expect(c.register('foo', f)).toBe(c);
        expect(c.register('bar', function () {})).toBe(c);
    });

    it('Throw an exception if a service already exists', function () {
        let c = new Container(),
            f = function () {};

        c.register('foo', f);

        expect(() => {
            c.register('foo', () => {});
        }).toThrow();
    });
});

describe('Container.alias', () => {
    it('Create an alias and return itself', () => {
        let c = new Container(),
            f = function () {};

        c.register('foo', f);

        expect(c.alias('f', 'foo')).toBe(c);

        // Create an alias of an alias.
        expect(c.alias('bar', 'f')).toBe(c);
    });

    it('Throw an exception if the identifier does not exist', () => {
        let c = new Container(),
            f = function () {};

        c.register('foo', f);

        expect(() => {
            c.alias('f', 'fo');
        }).toThrow();
    });
});

describe('Container.resolve', () => {
    it('Return the identifier of the service', () => {
        let c = new Container(),
            f = function () {};

        c
            .register('foo', f)
            .alias('f', 'foo')
            .alias('bar', 'f')
        ;

        expect(c.resolve('foo')).toBe('foo');
        expect(c.resolve('f')).toBe('foo');
        expect(c.resolve('bar')).toBe('foo');
    });

    it('Throw an error when the identifier could not be found', () => {
        let c = new Container(),
            f = function () {};

        c
            .register('foo', f)
            .alias('f', 'foo')
            .alias('bar', 'f')
        ;

        expect(() => {
            c.resolve('quux');
        }).toThrow();
    });
});

describe('Container.has', () => {
    it('Check if an identifier/alias exists', () => {
        let c = new Container(),
            f = function () {};

        c
            .register('foo', f)
            .alias('f', 'foo')
            .alias('bar', 'f')
        ;

        expect(c.has('foo')).toBe(true);
        expect(c.has('f')).toBe(true);
        expect(c.has('bar')).toBe(true);
        expect(c.has('bars')).toBe(false);
        expect(c.has('')).toBe(false);
    });
});

describe('Container.get', () => {
    it('Get the service', () => {
        let c = new Container(),
            f = function () {
                return 'foo';
            },
            k = function (foo) {
                return {
                    i: 0,
                    inc() {
                        this.i += 1;
                    },
                    hello() {
                        return `Hello ${foo}`;
                    }
                };
            };

        c
            .register('foo', f)
            .register('k', k)
            .alias('f', 'foo')
            .alias('bar', 'f')
        ;

        expect(c.get('foo')).toBe('foo');
        expect(c.get('f')).toBe('foo');
        expect(c.get('bar')).toBe('foo');

        let a = c.getServiceDefinition('k'),
            x;

        a.addMethodCall('inc');
        a.addMethodCall('inc');

        x = c.get('k');

        expect(x.i).toBe(2);
        expect(x.hello()).toBe('Hello foo');
    });
});
