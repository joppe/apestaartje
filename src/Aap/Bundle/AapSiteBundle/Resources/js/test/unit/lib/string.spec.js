/*global describe, it, expect*/

import {Str,RE_SPECIALS} from 'lib/lang/string';

describe('Str.escapeRegExp', function () {
    'use strict';

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
    'use strict';

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