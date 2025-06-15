import { range } from '@apestaartje/iterator/range/range';

import type { GroupCellsBy } from '../grid/GroupCellsBy';
import type { SudokuGrid } from '../grid/SudokuGrid';
import { cellsByBlock } from '../grid/cellsByBlock';
import { cellsByColumn } from '../grid/cellsByColumn';
import { cellsByRow } from '../grid/cellsByRow';

export function singlePossibilityInGroup(grid: SudokuGrid): Promise<number> {
  const groupers: GroupCellsBy[] = [cellsByBlock, cellsByRow, cellsByColumn];
  let solved = 0;

  outer: for (const grouper of groupers) {
    for (const index of range(0, 8)) {
      for (const nmbr of range(1, 9)) {
        let count = 0;

        for (const cell of grouper(grid, index)) {
          if (
            cell.possibilities.length > 1 &&
            cell.possibilities.includes(nmbr)
          ) {
            count += 1;
          }
        }

        if (count === 1) {
          for (const cell of grouper(grid, index)) {
            if (
              cell.possibilities.length > 1 &&
              cell.possibilities.includes(nmbr)
            ) {
              grid.setSolution(cell.index, nmbr);
              solved += 1;
              break outer;
            }
          }
        }
      }
    }
  }

  return new Promise((resolve) => {
    resolve(solved);
  });
}
