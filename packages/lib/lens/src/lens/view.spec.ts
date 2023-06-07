import { assoc } from './assoc';
import { lens } from './lens';
import { prop } from './prop';
import { view } from './view';

describe('view', (): void => {
  it('create a setter from a lens', (): void => {
    type Foo = {
      foo: string;
    };

    const a = {
      foo: 'bar',
    };
    const b = {
      foo: 'foo',
    };

    const getter = prop<Foo>('foo');
    const setter = assoc<Foo>('foo');
    const l = lens<Foo>(getter, setter);

    expect(view(l, a)).toBe('bar');
    expect(view(l, b)).toBe('foo');
  });
});
