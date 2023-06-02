import { head } from './head';

describe('head', (): void => {
  it('Return the first element of an array', (): void => {
    expect(head([1, 2, 3, 4, 5])).toBe(1);
    expect(head(['a', 'b', 'z'])).toBe('a');
  });

  it('Throw an exception when the array is empty', (): void => {
    expect((): void => {
      head([]);
    }).toThrow();
  });
});
