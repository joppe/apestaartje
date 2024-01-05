import { blockFirstCellGridIndex } from './blockFirstCellGridIndex';

describe('blockFirstCellGridIndex', () => {
  it('should return the index of the first cell in the given block', () => {
    expect(blockFirstCellGridIndex(0)).toBe(0);
    expect(blockFirstCellGridIndex(1)).toBe(3);
    expect(blockFirstCellGridIndex(6)).toBe(54);
  });
});
