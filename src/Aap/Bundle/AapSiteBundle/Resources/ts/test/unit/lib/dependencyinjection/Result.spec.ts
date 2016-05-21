/// <reference path="../../../../../../../../../../typings/globals/jasmine/index.d.ts" />

import {Result} from 'src/lib/dependencyinjection/Result';

let o = {
        bar: 'bar',
        foo() {
            return 'quux';
        },
        melp() {
            return '\\o/';
        }
    },
    r = new Result(o);

describe('Result.hasMethod', () => {
    it('Should say true when a method exists', () => {
        expect(r.hasMethod('foo')).toBe(true);
        expect(r.hasMethod('melp')).toBe(true);
    });

    it('Should say false when a method does not exists', () => {
        expect(r.hasMethod('foobar')).toBe(false);
        expect(r.hasMethod('bar')).toBe(false);
    });
});

describe('Result.applyMethod', () => {
    it('Return it self when a method is applied', () => {
        expect(r.applyMethod('foo')).toBe(r);
    });

    it('Throw an error when a non existing method is applied', () => {
        expect(() => {
            r.applyMethod('quux');
        }).toThrow();
    });
});

describe('Result.getValue', () => {
    it('Return the wrapped result when the getValue is executed', () => {
        expect(r.getValue()).toBe(o);
    });
});