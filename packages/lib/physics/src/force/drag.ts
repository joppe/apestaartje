import { Vector } from '@apestaartje/geometry/vector/Vector';
import { length } from '@apestaartje/geometry/vector/length';
import { scale } from '@apestaartje/geometry/vector/scale';

import { zero } from './zero';

/**
 * Apply drag on a velocity vector
 */

export function drag(k: number, velocity: Vector): Vector {
  if (length(velocity) === 0) {
    return zero();
  }

  return scale(velocity, -k);
}
