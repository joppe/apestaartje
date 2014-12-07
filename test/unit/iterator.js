/*global describe, it, expect, StringIterator*/

describe('Iterator checking', function () {
    it('Pos should initially be 0', function () {
        var i = StringIterator.create('Foo'),
            pos = i.key();

        expect(pos).toBe(0);
    });

    it('First character', function () {
        var i = StringIterator.create('Foo'),
            char = i.current();

        expect(char).toBe('F');
    });

    it('An empty string', function () {
        var i = StringIterator.create(''),
            char = i.current();

        expect(char).toBe(false);
    });
});