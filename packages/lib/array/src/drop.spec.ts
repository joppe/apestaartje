import { drop } from './drop';

describe('drop', (): void => {
  it('Remove the first number of elements of a list', (): void => {
    const a: number[] = [1, 2, 3, 4, 5];

    expect(drop(2, a)).toEqual([3, 4, 5]);
    expect(drop(20, a)).toEqual([]);
    expect(drop(0, a)).toEqual([1, 2, 3, 4, 5]);
    expect(a).toEqual([1, 2, 3, 4, 5]);
  });
});
