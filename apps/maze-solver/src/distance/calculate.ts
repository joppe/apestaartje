import type { Cell } from '../grid/cell/Cell';

import { Distances } from './Distances';

/**
 * Calculates the distances from a given cell to all other reachable cells in the maze.
 * It uses a breadth-first search (BFS) algorithm to explore the maze and populate the Distances object.
 */
export function calculate(cell: Cell): Distances {
  const distances = new Distances(cell);
  let frontier = [cell];

  while (frontier.length > 0) {
    const newFrontier: Cell[] = [];

    frontier.forEach((cell) => {
      for (const linked of cell.links()) {
        if (!distances.hasDistance(linked)) {
          distances.setDistance(linked, distances.getDistance(cell) + 1);
          newFrontier.push(linked);
        }
      }
    });

    frontier = newFrontier;
  }

  return distances;
}
