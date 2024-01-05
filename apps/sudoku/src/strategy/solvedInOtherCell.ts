import { range } from '@apestaartje/iterator/range/range';

import { GroupCellsBy } from '../grid/GroupCellsBy';
import { SudokuGrid } from '../grid/SudokuGrid';
import { cellsByBlock } from '../grid/cellsByBlock';
import { cellsByColumn } from '../grid/cellsByColumn';
import { cellsByRow } from '../grid/cellsByRow';

export function solvedInOtherCell(grid: SudokuGrid): Promise<number> {
  const groupers: GroupCellsBy[] = [cellsByBlock, cellsByRow, cellsByColumn];
  let solved = 0;

  for (const grouper of groupers) {
    for (const index of range(0, 8)) {
      const solutions: number[] = [];

      for (const cell of grouper(grid, index)) {
        if (cell.possibilities.length === 1) {
          solutions.push(cell.possibilities[0]);
        }
      }

      for (const solution of solutions) {
        for (const cell of grouper(grid, index)) {
          if (
            cell.possibilities.length > 1 &&
            cell.possibilities.includes(solution)
          ) {
            grid.setPossibilities(
              cell.index,
              cell.possibilities.filter(
                (possibility: number): boolean => possibility !== solution,
              ),
            );
            solved += 1;
          }
        }
      }
    }
  }

  return new Promise((resolve) => {
    resolve(solved);
  });
}
