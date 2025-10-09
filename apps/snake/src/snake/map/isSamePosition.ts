import type { GridPosition } from '@apestaartje/grid/GridPosition';

export function isSamePosition(a: GridPosition, b: GridPosition): boolean {
  return a.row === b.row && a.column === b.column;
}
