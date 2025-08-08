import type { Vector } from './Vector';
import { length } from './length';
import { scale } from './scale';

export function setLength(vector: Vector, newLength: number): Vector {
  if (newLength === 0) {
    return { x: 0, y: 0 };
  }

  const currentLength = length(vector);

  if (currentLength === 0) {
    // Return a unit vector in the x direction if the current length is zero
    return { x: newLength, y: 0 };
  }

  return scale(vector, newLength / currentLength);
}
