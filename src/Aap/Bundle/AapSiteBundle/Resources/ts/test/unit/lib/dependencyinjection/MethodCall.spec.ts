/// <reference path="../../../../../../../../../../typings/globals/jasmine/index.d.ts" />

import {MethodCall} from 'src/lib/dependencyinjection/MethodCall';

describe('MethodCall.constructor', () => {
    it('The args argument must be an array (if provided)', () => {
        expect(() => {
            new MethodCall('getFoo');
        }).not.toThrow();

        expect(() => {
            new MethodCall('getFoo', [1, 'a']);
        }).not.toThrow();

        expect(() => {
            new MethodCall('getFoo', 'a');
        }).toThrow();
    });
});

describe('MethodCall.getName', () => {
    it('Return the given name', () => {
        let m = new MethodCall('getFoo');

        expect(m.getName()).toBe('getFoo');
    });

    it('Return the given args', () => {
        let m = new MethodCall('getFoo', [21]);

        expect(m.getArgs()).toEqual([21]);
    });

    it('The args default to an empty array', () => {
        let m = new MethodCall('getFoo');

        expect(m.getArgs()).toEqual([]);
    });
});
