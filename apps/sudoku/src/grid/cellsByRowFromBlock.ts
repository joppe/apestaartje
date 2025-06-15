import type { Cell, SudokuGrid } from './SudokuGrid';
import { blockCellIndexToGridCellIndex } from './helper/blockCellIndexToGridCellIndex';

export function cellsByRowFromBlock(
  grid: SudokuGrid,
  blockIndex: number,
  rowIndex: number,
): Iterable<Cell> {
  let count = 0;

  return {
    [Symbol.iterator]() {
      return {
        next: (): IteratorResult<Cell> => {
          if (count > 2) {
            return {
              done: true,
              value: undefined,
            };
          }

          const nth = rowIndex * 3 + count;
          const index = blockCellIndexToGridCellIndex(blockIndex, nth);
          const value = grid.getCell(index);

          count += 1;

          return {
            done: false,
            value,
          };
        },
      };
    },
  };
}
