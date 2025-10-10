import type { Vector } from '@apestaartje/geometry/vector/Vector';
import type { Grid } from '@apestaartje/grid/Grid';

type GetPacmanPositionFromGridOptions = {
  grid: Grid<string>;
  pacmanChar: string;
  stepsPerUnit: number;
};

export function getPacmanPositionFromGrid({
  grid,
  pacmanChar,
  stepsPerUnit,
}: GetPacmanPositionFromGridOptions): Vector {
  const index = grid.cells.findIndex((cell) => cell.value === pacmanChar);

  if (index === -1) {
    throw new Error('Pacman not found');
  }

  const gridPosition = grid.toPosition(index);

  return {
    x: gridPosition.column * stepsPerUnit,
    y: gridPosition.row * stepsPerUnit,
  };
}
