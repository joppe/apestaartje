import { assoc } from './assoc';
import { lens } from './lens';
import { prop } from './prop';

describe('lens', (): void => {
  it('create a lens for a property on an object', (): void => {
    type Foo = {
      foo: string;
    };

    const a = {
      foo: 'bar',
    };

    const getter = prop<Foo>('foo');
    const setter = assoc<Foo>('foo');
    const l = lens<Foo>(getter, setter);

    expect(l.get(a)).toBe('bar');

    const a2 = l.set('hello', a);
    expect(a.foo).toBe('bar');
    expect(a2.foo).toBe('hello');
  });
});
