import { filter } from '@apestaartje/iterator/filter/filter';
import { random } from '@apestaartje/number/random';

import type { Cell } from '../../grid/cell/Cell';
import type { Grid } from '../../grid/Grid';
import type { Generator } from '../Generator';
import type { GridFactory } from '../GridFactory';

/**
 * The Hunt-and-Kill algorithm is a maze generation algorithm that combines elements of both the Recursive Backtracker
 * and the Binary Tree algorithms. It starts by randomly selecting a cell and carving a path through unvisited
 * neighbors until it reaches a dead end. At this point, it "hunts" for the next unvisited cell that has at least one
 * visited neighbor, links it to one of its visited neighbors, and continues the process until all cells have been
 * visited.
 */
export const huntAntKill: Generator = (factory: GridFactory): Grid => {
  const grid = factory();
  let current: Cell | undefined = grid.getRandomCell();

  while (current !== undefined) {
    const unvisitedNeighbours: Cell[] = filter(
      current.neighbours,
      (neighbour) => neighbour.linkCount() === 0,
    );

    if (unvisitedNeighbours.length > 0) {
      const index = random(0, unvisitedNeighbours.length - 1);
      const neighbour = unvisitedNeighbours[index];

      current.link(neighbour);
      current = neighbour;
    } else {
      current = undefined;

      grid.forEachCell((cell) => {
        const visitedNeighbours = filter(
          cell.neighbours,
          (neighbour) => neighbour.linkCount() > 0,
        );

        if (cell.linkCount() === 0 && visitedNeighbours.length > 0) {
          const index = random(0, visitedNeighbours.length - 1);
          const neighbour = visitedNeighbours[index];

          current = cell;
          current.link(neighbour);
        }
      });
    }
  }

  return grid;
};
