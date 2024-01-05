import { blockAxisIndexToGridAxisIndex } from './blockAxisIndexToGridAxisIndex';

describe('blockAxisIndexToGridAxisIndex', () => {
  it('should translate the index of a row in a block to the index of the same row in the grid', () => {
    expect(blockAxisIndexToGridAxisIndex(0, 0, 'row')).toBe(0);
    expect(blockAxisIndexToGridAxisIndex(3, 1, 'row')).toBe(4);
    expect(blockAxisIndexToGridAxisIndex(8, 0, 'row')).toBe(6);
  });

  it('should translate the index of a column in a block to the index of the same column in the grid', () => {
    expect(blockAxisIndexToGridAxisIndex(0, 0, 'column')).toBe(0);
    expect(blockAxisIndexToGridAxisIndex(3, 1, 'column')).toBe(1);
    expect(blockAxisIndexToGridAxisIndex(8, 0, 'column')).toBe(6);
  });
});
