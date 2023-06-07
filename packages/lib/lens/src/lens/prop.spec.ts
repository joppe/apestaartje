import { prop } from './prop';

describe('prop', (): void => {
  it('create a property value getter for an object', (): void => {
    type Foo = {
      foo: string;
    };

    const a = {
      foo: 'bar',
    };
    const b = {
      foo: 'quux',
    };

    const getter = prop<Foo>('foo');

    expect(getter(a)).toBe('bar');
    expect(getter(b)).toBe('quux');
  });
});
