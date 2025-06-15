import type { Vector } from './Vector';
import { scale } from './scale';

/**
 * Let the vector point in opposite direction
 */

export function negate(a: Vector): Vector {
  return scale(a, -1);
}
