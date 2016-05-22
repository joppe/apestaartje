/// <reference path="../../../../../../../../../../typings/globals/jasmine/index.d.ts" />

import {ServiceResult} from 'src/lib/dependencyinjection/ServiceResult';

let o = {
        bar: 'bar',
        foo() {
            return 'quux';
        },
        melp() {
            return '\\o/';
        }
    },
    r = new ServiceResult(o);

describe('ServiceResult.hasMethod', () => {
    it('Should say true when a method exists', () => {
        expect(r.hasMethod('foo')).toBe(true);
        expect(r.hasMethod('melp')).toBe(true);
    });

    it('Should say false when a method does not exists', () => {
        expect(r.hasMethod('foobar')).toBe(false);
        expect(r.hasMethod('bar')).toBe(false);
    });
});

describe('ServiceResult.callMethod', () => {
    it('Return it self when a method is applied', () => {
        expect(r.callMethod('foo', [])).toBe(r);
    });

    it('Throw an error when a non existing method is applied', () => {
        expect(() => {
            r.callMethod('quux', []);
        }).toThrow();
    });
});

describe('ServiceResult.getValue', () => {
    it('Return the wrapped result when the getValue is executed', () => {
        expect(r.getValue()).toBe(o);
    });
});
