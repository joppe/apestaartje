/// <reference path="../../../../../../../../../../typings/globals/jasmine/index.d.ts" />

import {Func} from 'src/lib/lang/Func';

describe('Func.invoke', () => {
    it('Do not execute more then the given limit', () => {
        let f = new Func((() => {
            let c = 0;

            return () => {
                c += 1;
                return c;
            };
        })(), 2);

        expect(f.invoke()).toBe(1);
        expect(f.invoke()).toBe(2);
        expect(f.invoke()).toBe(2);
    });

    it('Do not execute when the limit is 0', () => {
        let f = new Func((() => {
            let c = 0;

            return () => {
                c += 1;
                return c;
            };
        })(), 0);

        expect(f.invoke()).toBe(undefined);
        expect(f.invoke()).toBe(undefined);
        expect(f.invoke()).toBe(undefined);
    });

    it('Execute for ever when the limit is -1', () => {
        let f = new Func((() => {
            let c = 0;

            return () => {
                c += 1;
                return c;
            };
        })(), -1);

        expect(f.invoke()).toBe(1);
        expect(f.invoke()).toBe(2);
        expect(f.invoke()).toBe(3);
        expect(f.invoke()).toBe(4);
        expect(f.invoke()).toBe(5);
        expect(f.invoke()).toBe(6);
    });

    it('The default limit is -1', () => {
        let f = new Func((() => {
            let c = 0;

            return () => {
                c += 1;
                return c;
            };
        })());

        expect(f.invoke()).toBe(1);
        expect(f.invoke()).toBe(2);
        expect(f.invoke()).toBe(3);
        expect(f.invoke()).toBe(4);
        expect(f.invoke()).toBe(5);
        expect(f.invoke()).toBe(6);
    });
});

describe('Func.argumentNames', () => {
    it('Get the names of all arguments of an anonymous function', () => {
        let f = new Func(function (a, ab, absdef) {}),
            ff = new Func((a, ab, absdef) => {});

        expect(f.argumentNames).toEqual(['a', 'ab', 'absdef']);
        expect(ff.argumentNames).toEqual(['a', 'ab', 'absdef']);
    });

    it('Get the names of all arguments of a named function', () => {
        let f = new Func(function foo(a, ab, absdef) {});

        expect(f.argumentNames).toEqual(['a', 'ab', 'absdef']);
    });

    it('Get the names of all arguments of a named function, ignoring trailing spaces', () => {
        let f = new Func(function foo (a  , ab  , absdef  ) {});

        expect(f.argumentNames).toEqual(['a', 'ab', 'absdef']);
      
    });

    it('Get an empty array when no arguments for an anonymous function', () => {
        let f = new Func(function () {}),
            ff = new Func(() => {});

        expect(f.argumentNames).toEqual([]);
        expect(ff.argumentNames).toEqual([]);
    });

    it('Get an empty array when no arguments for a named function', () => {
        let f = new Func(function foo () {});

        expect(f.argumentNames).toEqual([]);
    });
});

describe('Func.getExecutionCount', () => {
    it('Get the number how many times the function is executed', () => {
        let f = new Func(function foo () {});

        expect(f.getExecutionCount()).toBe(0);
        f.invoke();
        expect(f.getExecutionCount()).toBe(1);
        f.invoke();
        f.invoke();
        expect(f.getExecutionCount()).toBe(3);
    });
});