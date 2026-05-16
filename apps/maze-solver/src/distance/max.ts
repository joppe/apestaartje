import type { Cell } from '../grid/cell/Cell';
import type { Distances } from './Distances';

/**
 * Finds the cell that is the farthest from the root cell in the given Distances object.
 * It iterates through all cells in the Distances object and keeps track of the maximum distance found.
 * Returns a tuple containing the cell that is the farthest and its distance from the root cell.
 */
export function max(distances: Distances): [Cell, number] {
  let maxDistance = 0;
  let currentCell = distances.root;

  for (const cell of distances.getCells()) {
    const distance = distances.getDistance(cell);

    if (distance > maxDistance) {
      currentCell = cell;
      maxDistance = distance;
    }
  }

  return [currentCell, maxDistance];
}
