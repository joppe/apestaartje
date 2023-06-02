import { last } from './last';

describe('last', (): void => {
  it('Return the last element of an array', (): void => {
    expect(last([1, 2, 3, 4, 5])).toBe(5);
    expect(last(['a', 'b', 'z'])).toBe('z');
  });

  it('Throw an exception when the array is empty', (): void => {
    expect((): void => {
      last([]);
    }).toThrow();
  });
});
