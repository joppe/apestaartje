import type { Cell } from '../grid/cell/Cell';
import type { Grid } from '../grid/Grid';

/**
 * Counts the number of dead ends in a maze represented by a Grid object.
 * A dead end is defined as a cell that has only one link to another cell.
 * The function iterates through each cell in the grid and checks the number of links it has. If a cell has only one
 * link, it is considered a dead end, and the count is incremented. Finally, the total count of dead ends is returned.
 */
export function deadEnds(grid: Grid): number {
  let count = 0;

  grid.forEachCell((cell: Cell): void => {
    if (cell.linkCount() === 1) {
      count += 1;
    }
  });

  return count;
}
