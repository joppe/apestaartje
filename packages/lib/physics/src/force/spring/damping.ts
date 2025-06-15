import type { Vector } from '@apestaartje/geometry/vector/Vector';
import { length } from '@apestaartje/geometry/vector/length';
import { scale } from '@apestaartje/geometry/vector/scale';

import { zero } from '../zero';

export function damping(c: number, velocity: Vector): Vector {
  const l: number = length(velocity);

  if (l > 0) {
    return scale(velocity, -c);
  }

  return zero();
}
