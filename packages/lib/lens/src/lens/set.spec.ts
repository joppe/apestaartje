import { assoc } from './assoc';
import { lens } from './lens';
import { prop } from './prop';
import { set } from './set';

describe('set', (): void => {
  it('create a setter from a lens', (): void => {
    type Foo = {
      foo: string;
    };

    const a = {
      foo: 'bar',
    };

    const getter = prop<Foo>('foo');
    const setter = assoc<Foo>('foo');
    const l = lens<Foo>(getter, setter);
    const s = set(l, 'test', a);

    expect(a.foo).toBe('bar');
    expect(s.foo).toBe('test');
  });
});
