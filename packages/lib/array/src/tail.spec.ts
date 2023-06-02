import { tail } from './tail';

describe('tail', (): void => {
  it('Remove the first element of an array', (): void => {
    expect(tail([1, 2, 3, 4, 5])).toEqual([2, 3, 4, 5]);
    expect(tail(['a', 'b', 'z'])).toEqual(['b', 'z']);
  });

  it('Throw an exception when the array is empty', (): void => {
    expect((): void => {
      tail([]);
    }).toThrow();
  });
});
