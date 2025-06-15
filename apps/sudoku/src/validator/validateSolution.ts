import { range } from '@apestaartje/iterator/range/range';

import type { GroupCellsBy } from '../grid/GroupCellsBy';
import type { SudokuGrid } from '../grid/SudokuGrid';
import { cellsByBlock } from '../grid/cellsByBlock';
import { cellsByColumn } from '../grid/cellsByColumn';
import { cellsByRow } from '../grid/cellsByRow';

export function validateSolution(grid: SudokuGrid): boolean {
  const groupers: GroupCellsBy[] = [cellsByBlock, cellsByRow, cellsByColumn];

  for (const grouper of groupers) {
    for (const index of range(0, 8)) {
      const cells = [];

      for (const cell of grouper(grid, index)) {
        if (cell.possibilities.length !== 1) {
          return false;
        }

        cells.push(cell.possibilities[0]);
      }

      for (const nmbr of range(1, 9)) {
        if (!cells.includes(nmbr)) {
          return false;
        }
      }
    }
  }

  return true;
}
