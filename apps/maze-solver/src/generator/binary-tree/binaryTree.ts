import { random } from '@apestaartje/number/random';

import type { Grid } from '../../grid/Grid';
import type { Generator } from '../Generator';
import type { GridFactory } from '../GridFactory';

export const binaryTree: Generator = (factory: GridFactory): Grid => {
  const grid = factory();

  grid.forEachCell((cell) => {
    const neighbours = [];

    if (cell.north) {
      neighbours.push(cell.north);
    }
    if (cell.east) {
      neighbours.push(cell.east);
    }

    if (neighbours.length) {
      const index = random(0, neighbours.length - 1);
      const neighbour = neighbours[index];

      cell.link(neighbour);
    }
  });

  return grid;
};
