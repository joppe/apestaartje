import { take } from './take';

describe('take', (): void => {
  it('Take the first number of elements of a list', (): void => {
    const a: number[] = [1, 2, 3, 4, 5];

    expect(take(2, a)).toEqual([1, 2]);
    expect(take(20, a)).toEqual([1, 2, 3, 4, 5]);
    expect(take(0, a)).toEqual([]);
    expect(a).toEqual([1, 2, 3, 4, 5]);
  });
});
