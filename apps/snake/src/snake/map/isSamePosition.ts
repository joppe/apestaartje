import { GridPosition } from '@apestaartje/grid/grid/GridPosition';

export function isSamePosition(a: GridPosition, b: GridPosition): boolean {
  return a.row === b.row && a.column === b.column;
}
