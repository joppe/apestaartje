/// <reference path="../../../../../../../../../../typings/globals/jasmine/index.d.ts" />

import {Func} from 'src/lib/lang/Func';

describe('Func', () => {
    it('Get the names of all arguments of an anonymous function', () => {
        let f = new Func(function (a, ab, absdef) {});

        expect(f.argumentNames).toEqual(['a', 'ab', 'absdef']);
    });
    /*/
    it('Get the names of all arguments of a named function', function () {
      
        expect(Func.argumentNames(function foo(a, ab, absdef) {
        })).toEqual(['a', 'ab', 'absdef']);
      
    });

    it('Get the names of all arguments of a named function, ignoring trailing spaces', function () {
      
        expect(Func.argumentNames(function foo (a, ab, absdef) {
        })).toEqual(['a', 'ab', 'absdef']);
      
    });

    it('Get an empty array when no arguments for an anonymous function', function () {
        expect(Func.argumentNames(function () {
        })).toEqual([]);
    });

    it('Get an empty array when no arguments for a named function', function () {
        expect(Func.argumentNames(function foo() {
        })).toEqual([]);
    });
    /**/
});