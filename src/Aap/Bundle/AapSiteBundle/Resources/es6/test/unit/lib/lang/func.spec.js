/*global describe, it, expect*/

import {Func} from 'lib/lang/func';

describe('Str.escapeRegExp', function () {
    'use strict';

    it('Get the names of all arguments of an anonymous function', function () {
        /* jshint unused:false */
        expect(Func.argumentNames(function (a, ab, absdef) {
        })).toEqual(['a', 'ab', 'absdef']);
        /* jshint unused:true */
    });

    it('Get the names of all arguments of a named function', function () {
        /* jshint unused:false */
        expect(Func.argumentNames(function foo(a, ab, absdef) {
        })).toEqual(['a', 'ab', 'absdef']);
        /* jshint unused:true */
    });

    it('Get the names of all arguments of a named function, ignoring trailing spaces', function () {
        /* jshint unused:false */
        expect(Func.argumentNames(function foo (a, ab, absdef) {
        })).toEqual(['a', 'ab', 'absdef']);
        /* jshint unused:true */
    });

    it('Get an empty array when no arguments for an anonymous function', function () {
        expect(Func.argumentNames(function () {
        })).toEqual([]);
    });

    it('Get an empty array when no arguments for a named function', function () {
        expect(Func.argumentNames(function foo() {
        })).toEqual([]);
    });
});