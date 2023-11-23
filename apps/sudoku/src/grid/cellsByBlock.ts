import { Cell, SudokuGrid } from './SudokuGrid';

export function cellsByBlock(grid: SudokuGrid, block: number): Iterable<Cell> {
  const column = block % 3;
  const row = Math.floor(block / 3);
  const start = column * 3 + row * 27;
  let index = 0;

  return {
    [Symbol.iterator]() {
      return {
        next: (): IteratorResult<Cell> => {
          if (index > 8) {
            return {
              done: true,
              value: undefined,
            };
          }

          const gridIndex = start + (index % 3) + Math.floor(index / 3) * 9;
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
