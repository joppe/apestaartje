import { blockCellIndexToGridCellIndex } from './blockCellIndexToGridCellIndex';

describe('blockCellIndexToGridCellIndex', () => {
  it('should return the grid index of a cell in a given block', () => {
    expect(blockCellIndexToGridCellIndex(0, 0)).toBe(0);
    expect(blockCellIndexToGridCellIndex(2, 8)).toBe(26);
    expect(blockCellIndexToGridCellIndex(5, 5)).toBe(44);
  });
});
