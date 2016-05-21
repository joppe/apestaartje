/// <reference path="../../../../../../../../../../typings/globals/jasmine/index.d.ts" />

import {Service} from 'src/lib/dependencyinjection/Service';

describe('Service.setParameter', () => {
    it('Set the value of a parameter an return itself', () => {
        let f = function (a, b, foo) {},
            s = new Service('s', f);

        expect(s.setParameter('a', 1)).toBe(s);
    });

    it('Throw an exception when trying to set the value of a non existing parameter', () => {
        let f = function (a, b, foo) {},
            s = new Service('s', f);

        expect(() => {
            s.setParameter('quux', 2);
        }).toThrow();
    });
});

describe('Service.getParameter', () => {
    it('Return the value of the parameter', () => {
        let f = function (a, b, foo) {},
            s = new Service('s', f);

        s.setParameter('a', 10);

        expect(s.getParameter('a')).toBe(10);
        expect(s.getParameter('b')).toBe(undefined);
    });

    it('Throw an exception when requesting a non existing parameter', () => {
        let f = function (a, b, foo) {},
            s = new Service('s', f);

        expect(() => {
            s.getParameter('bar');
        }).toThrow();
    });
});

describe('Service.hasParameter', () => {
    it('Check the existence of a parameter', () => {
        let f = function (a, b, foo) {},
            s = new Service('s', f);

        expect(s.hasParameter('a')).toBe(true);
        expect(s.hasParameter('aa')).toBe(false);
    });

    it('Check the existence of a parameter when there are now paramters', () => {
        let f = function () {},
            s = new Service('s', f);

        expect(s.hasParameter('a')).toBe(false);
        expect(s.hasParameter('aa')).toBe(false);
    });
});
