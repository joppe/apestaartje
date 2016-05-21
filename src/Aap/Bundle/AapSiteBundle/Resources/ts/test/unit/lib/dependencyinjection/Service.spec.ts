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

describe('Service.getIdentifier', () => {
    it('Must return the given identifier', () => {
        let f = function () {},
            s = new Service('s', f);

        expect(s.getIdentifier()).toBe('s');
    });
});

describe('Service.getArguments', () => {
    it('Must return the parameters as an array', () => {
        let f = function (a, b, foobar) {},
            s = new Service('s', f);

        expect(s.getArguments()).toEqual([undefined, undefined, undefined]);

        s.setParameter('a', 1);
        s.setParameter('b', 'b');
        s.setParameter('foobar', []);
        expect(s.getArguments()).toEqual([1, 'b', []]);
    });
});

describe('Service.call', () => {
    let o = {
            i: 0,
            k: 0,
            x: '',
            setX(x) {
                this.x = x;
            },
            inc() {
                this.i += 1;
            }
        },
        f = () => {
            o.k += 1;
            return o;
        };

    it('When the service is executed it should return the result of the function', () => {
        let s = new Service('s', f),
            r;

        expect(o.k).toBe(0);
        expect(s.call()).toBe(o);

        r = s.call();
        expect(r).toBe(o);
        expect(r.k).toBe(1);
    });
});

describe('Service.addMethodCall', () => {
    let o = {
            i: 0,
            k: 0,
            x: '',
            setX(x) {
                this.x = x;
            },
            inc() {
                this.i += 1;
            }
        },
        f = () => {
            o.k += 1;
            return o;
        };

    it('When the service is executed it should return the result of the function', () => {
        let s = new Service('s', f),
            r;

        expect(o.i).toBe(0);
        s.addMethodCall('inc');
        s.addMethodCall('inc');
        s.addMethodCall('setX', [18]);

        r = s.call();
        expect(r.x).toBe(18);
        expect(r.i).toBe(2);
    });
});
