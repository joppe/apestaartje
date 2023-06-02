import { reverse } from './reverse';

describe('reverse', (): void => {
  it('Reverse an array without modifying the original', (): void => {
    const a: number[] = [1, 2, 3, 4, 5];

    expect(reverse(a)).toEqual([5, 4, 3, 2, 1]);
    expect(a).toEqual([1, 2, 3, 4, 5]);
  });
});
