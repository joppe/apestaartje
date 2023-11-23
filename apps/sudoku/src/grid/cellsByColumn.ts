import { Cell, SudokuGrid } from './SudokuGrid';

export function cellsByColumn(
  grid: SudokuGrid,
  column: number,
): Iterable<Cell> {
  const start = column;
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

          const gridIndex = start + index * 9;
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
