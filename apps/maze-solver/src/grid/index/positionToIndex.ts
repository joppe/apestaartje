import type { GridPosition } from '../GridPosition';

export function positionToIndex(
  position: GridPosition,
  columns: number,
): number {
  return position.column + columns * position.row;
}
