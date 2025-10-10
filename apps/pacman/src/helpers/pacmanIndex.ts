import type { Grid } from '@apestaartje/grid/Grid';
import type { GridPosition } from '@apestaartje/grid/GridPosition';

export function findPacman(
  grid: Grid<string>,
  pacmanChar: string,
): GridPosition {
  const index = grid.cells.findIndex((cell) => cell.value === pacmanChar);

  if (index === -1) {
    throw new Error('Pacman not found');
  }

  return grid.toPosition(index);
}
