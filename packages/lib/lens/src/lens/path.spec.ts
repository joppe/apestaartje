import { path } from './path';

describe('lens', (): void => {
  it('create a lens for a property on an object', (): void => {
    const a = {
      foo: 'bar',
      nested: {
        value: {
          prop: 10,
        },
      },
    };

    const getFoo = path<typeof a>()(['foo']);
    const getProp = path<typeof a>()(['nested', 'value', 'prop']);

    expect(getFoo(a)).toBe('bar');
    expect(getProp(a)).toBe(10);
  });
});
