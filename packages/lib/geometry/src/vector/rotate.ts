import { Vector } from './Vector';
import { angle } from './angle';
import { length } from './length';

/**
 * Rotate a vector
 */

export function rotate(a: Vector, radians: number): Vector {
  const sum: number = angle(a) + radians;
  const len: number = length(a);

  return {
    x: len * Math.cos(sum),
    y: len * Math.sin(sum),
  };
}
