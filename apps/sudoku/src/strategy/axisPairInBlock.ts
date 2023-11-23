import { range } from '@apestaartje/iterator/range/range';

import { GroupCellsBy } from '../grid/GroupCellsBy';
import { SudokuGrid } from '../grid/SudokuGrid';
import { cellsByBlock } from '../grid/cellsByBlock';
import { cellsByColumn } from '../grid/cellsByColumn';
import { cellsByRow } from '../grid/cellsByRow';

export function axisPairInBlock(grid: SudokuGrid): Promise<number> {
  const solved = 0;

  for (const index of range(0, 8)) {
    const cells = Array.from(cellsByBlock(grid, index));
    const firstPosition = grid.getPosition(cells[0].index);

    console.log(cells);
  }

  return new Promise((resolve) => {
    resolve(solved);
  });
}
