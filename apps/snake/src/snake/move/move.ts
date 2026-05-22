import type { GridPosition } from '@apestaartje/grid/GridPosition';

import type { Direction } from './Direction';
import { step } from './step';

export function move(
  position: GridPosition,
  direction: Direction,
  steps = 1,
): GridPosition {
  let newPosition = position;
  let remainingSteps = steps;

  while (remainingSteps > 0) {
    newPosition = step(newPosition, direction);
    remainingSteps -= 1;
  }

  return newPosition;
}
