import type { Cell, SudokuGrid } from './SudokuGrid';

export function cellsByRow(grid: SudokuGrid, row: number): Iterable<Cell> {
  const start = row * 9;
  let index = 0;

  return {
    [Symbol.iterator]() {
      return {
        next(): IteratorResult<Cell> {
          if (index > 8) {
            return {
              done: true,
              value: undefined,
            };
          }

          const gridIndex = start + index;
          const value = grid.getCell(gridIndex);

          index += 1;

          return {
            done: false,
            value,
          };
        },
      };
    },
  };
}
