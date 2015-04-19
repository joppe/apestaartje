/*global describe, it, expect*/

import {Str, RE_SPECIALS, PAD_LEFT, PAD_RIGHT} from 'lib/lang/Str';

describe('Str.escapeRegExp', function () {
    it('Add a slash to the regexp special chars', function () {
        RE_SPECIALS.forEach(c => {
            expect(Str.escapeRegExp(c)).toBe('\\' + c);
        });
    });

    it('Do not add slashes to normal chars', function () {
        expect(Str.escapeRegExp('foo')).toBe('foo');
    });
});

describe('Str.toCamelCase', function () {
    it('Convert a underscore followed by a letter to an uppercase letter', function () {
        expect(Str.toCamelCase('hello_world')).toBe('helloWorld');
    });

    it('Should leave numbers to what they are', function () {
        expect(Str.toCamelCase('hello_1world')).toBe('hello1world');
    });

    it('Double underscores will be replaced by a single underscore', function () {
        expect(Str.toCamelCase('hello__world')).toBe('hello_world');
    });
});

describe('Str.toSnakeCase', function () {
    it('Convert uppercased chars to lowercased chars with an underscore prefix', function () {
        expect(Str.toSnakeCase('helloWorld')).toBe('hello_world');
    });
});

describe('Str.toSpineCase', function () {
    it('Convert uppercased chars to lowercased chars with a dash prefix', function () {
        expect(Str.toSpineCase('helloWorld')).toBe('hello-world');
    });
});

describe('Str.ucfirst', function () {
    it('Only the fist char must be uppercase', function () {
        expect(Str.ucfirst('aaaaa')).toBe('Aaaaa');
    });

    it('Leave strings starting with a number untouched', function () {
        expect(Str.ucfirst('1aaaaa')).toBe('1aaaaa');
    });
});

describe('Str.pad', function () {
    it('Pad left (default)', function () {
        expect(Str.pad('a', 4, 'b')).toBe('bbba');
    });

    it('Pad left', function () {
        expect(Str.pad('c', 4, 'b', PAD_LEFT)).toBe('bbbc');
    });

    it('Pad right', function () {
        expect(Str.pad('1', 4, '0', PAD_RIGHT)).toBe('1000');
    });
});