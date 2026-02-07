import type { Rectangle } from './Rectangle';

/**
 * Calculate the height of a Rectangle
 */
export function height(square: Rectangle): number {
  return Math.abs(square.bottomRight.y - square.topLeft.y);
}
