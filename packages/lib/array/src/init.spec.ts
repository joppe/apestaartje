import { init } from './init';

describe('init', (): void => {
  it('Remove the last element of an array', (): void => {
    expect(init([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4]);
    expect(init(['a', 'b', 'z'])).toEqual(['a', 'b']);
  });

  it('Throw an exception when the array is empty', (): void => {
    expect((): void => {
      init([]);
    }).toThrow();
  });
});
