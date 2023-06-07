import { assoc } from './assoc';

describe('assoc', (): void => {
  it('create a property value setter for an object', (): void => {
    type Foo = {
      foo: string;
    };

    const a = {
      foo: 'bar',
    };

    const setter = assoc<Foo>('foo');

    const a2 = setter('test', a);

    expect(a.foo).toBe('bar');
    expect(a2.foo).toBe('test');
  });
});
