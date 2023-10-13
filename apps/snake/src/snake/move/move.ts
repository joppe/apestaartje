import { GridPosition } from '@apestaartje/grid/grid/GridPosition';

import { Direction } from './Direction';
import { step } from './step';

export function move(
  position: GridPosition,
  direction: Direction,
  steps: number = 1,
): GridPosition {
  let newPosition = position;
  let remainingSteps = steps;

  while (remainingSteps > 0) {
    newPosition = step(newPosition, direction);
    remainingSteps -= 1;
  }

  return newPosition;
}
