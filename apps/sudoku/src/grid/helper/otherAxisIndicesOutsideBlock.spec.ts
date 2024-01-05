import { otherAxisIndicesOutsideBlock } from './otherAxisIndicesOutsideBlock';

describe('otherAxisIndicesOutsideBlock', () => {
  it('should return the column indices of the other axis outside the block', () => {
    expect(otherAxisIndicesOutsideBlock(0, 'row')).toEqual([3, 4, 5, 6, 7, 8]);
    expect(otherAxisIndicesOutsideBlock(4, 'row')).toEqual([0, 1, 2, 6, 7, 8]);
    expect(otherAxisIndicesOutsideBlock(8, 'row')).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it('should return the row indices of the other axis outside the block', () => {
    expect(otherAxisIndicesOutsideBlock(0, 'column')).toEqual([
      3, 4, 5, 6, 7, 8,
    ]);
    expect(otherAxisIndicesOutsideBlock(4, 'column')).toEqual([
      0, 1, 2, 6, 7, 8,
    ]);
    expect(otherAxisIndicesOutsideBlock(8, 'column')).toEqual([
      0, 1, 2, 3, 4, 5,
    ]);
  });
});
