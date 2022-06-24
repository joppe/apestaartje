import type { Point } from './Point';

/**
 * Clone a Point object
 */

export function clone(point: Point): Point {
  return {
    x: point.x,
    y: point.y,
  };
}
