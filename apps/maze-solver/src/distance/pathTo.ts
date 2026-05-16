import type { Cell } from '../grid/cell/Cell';

import { calculate } from './calculate';
import { Distances } from './Distances';

/**
 * Finds the path from a starting cell to a target cell in the maze.
 * It first calculates the distances from the starting cell to all other cells using the calculate function.
 * Then, it backtracks from the target cell to the starting cell by following the cells with decreasing distance values.
 * The resulting path is stored in a new Distances object, which is returned at the end.
 */
export function pathTo(from: Cell, to: Cell): Distances {
  const distances = calculate(from);
  const breadcrumbs = new Distances(from);
  let current = to;

  breadcrumbs.setDistance(current, distances.getDistance(current) as number);

  while (current !== from) {
    for (const neighbour of current.links()) {
      if (distances.getDistance(neighbour) < distances.getDistance(current)) {
        breadcrumbs.setDistance(neighbour, distances.getDistance(neighbour));
        current = neighbour;

        break;
      }
    }
  }

  return breadcrumbs;
}
