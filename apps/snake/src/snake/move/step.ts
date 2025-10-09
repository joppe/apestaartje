import type { GridPosition } from '@apestaartje/grid/GridPosition';

import { Direction } from './Direction';

export function step(
  position: GridPosition,
  direction: Direction,
): GridPosition {
  switch (direction) {
    case Direction.Up:
      return { row: position.row - 1, column: position.column };
    case Direction.Down:
      return { row: position.row + 1, column: position.column };
    case Direction.Left:
      return { row: position.row, column: position.column - 1 };
    case Direction.Right:
      return { row: position.row, column: position.column + 1 };
  }
}
