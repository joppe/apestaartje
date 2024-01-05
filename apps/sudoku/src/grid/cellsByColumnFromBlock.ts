import { Cell, SudokuGrid } from './SudokuGrid';
import { blockCellIndexToGridCellIndex } from './helper/blockCellIndexToGridCellIndex';

export function cellsByColumnFromBlock(
  grid: SudokuGrid,
  blockIndex: number,
  columnIndex: number,
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

          const nth = columnIndex + count * 3;
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
