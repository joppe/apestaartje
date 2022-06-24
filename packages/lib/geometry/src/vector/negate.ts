import { scale } from './scale';
import type { Vector } from './Vector';

/**
 * Let the vector point in opposite direction
 */

export function negate(a: Vector): Vector {
  return scale(a, -1);
}
