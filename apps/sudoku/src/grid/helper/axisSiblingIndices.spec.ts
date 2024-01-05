import { axisSiblingIndices } from './axisSiblingIndices';

describe('axisSiblingIndices', () => {
  it('should return the indices of the siblings of the given index', () => {
    expect(axisSiblingIndices(0)).toEqual([1, 2]);
    expect(axisSiblingIndices(1)).toEqual([0, 2]);
    expect(axisSiblingIndices(2)).toEqual([0, 1]);
    expect(axisSiblingIndices(3)).toEqual([4, 5]);
    expect(axisSiblingIndices(4)).toEqual([3, 5]);
    expect(axisSiblingIndices(5)).toEqual([3, 4]);
    expect(axisSiblingIndices(6)).toEqual([7, 8]);
    expect(axisSiblingIndices(7)).toEqual([6, 8]);
    expect(axisSiblingIndices(8)).toEqual([6, 7]);
  });
});
