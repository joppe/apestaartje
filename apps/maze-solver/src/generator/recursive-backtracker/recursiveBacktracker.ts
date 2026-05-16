import { filter } from '@apestaartje/iterator/filter/filter';
import { random } from '@apestaartje/number/random';

import type { Cell } from '../../grid/cell/Cell';
import type { Grid } from '../../grid/Grid';
import type { Generator } from '../Generator';
import type { GridFactory } from '../GridFactory';

export const recursiveBacktracker: Generator = (factory: GridFactory): Grid => {
  const grid = factory();
  const stack: Cell[] = [grid.getRandomCell()];

  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    const unvisitedNeighbours: Cell[] = filter(
      current.neighbours,
      (neighbour) => neighbour.linkCount() === 0,
    );

    if (unvisitedNeighbours.length === 0) {
      stack.pop();
    } else {
      const index = random(0, unvisitedNeighbours.length - 1);
      const neighbour = unvisitedNeighbours[index];

      current.link(neighbour);

      stack.push(neighbour);
    }
  }

  return grid;
};
