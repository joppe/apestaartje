import { cellIndexToBlockIndex } from './cellIndexToBlockIndex';

describe('cellIndexToBlockIndex', () => {
  it('should translate the index of a cell to the index of the block it belongs to', () => {
    expect(cellIndexToBlockIndex(0)).toBe(0);
    expect(cellIndexToBlockIndex(9)).toBe(0);
    expect(cellIndexToBlockIndex(4)).toBe(1);
    expect(cellIndexToBlockIndex(22)).toBe(1);
    expect(cellIndexToBlockIndex(52)).toBe(5);
  });
});
