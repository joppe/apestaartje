import type { GridPosition } from '../GridPosition';

export function indexToPosition(index: number, columns: number): GridPosition {
  return {
    column: index % columns,
    row: Math.floor(index / columns),
  };
}
