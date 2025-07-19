import type { Rectangle } from './Rectangle';

/**
 * Calculate the width of a rectangle
 */
export function width(rectangle: Rectangle): number {
  return Math.abs(rectangle.bottomRight.x - rectangle.topLeft.x);
}
