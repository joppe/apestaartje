import { Vector } from '@apestaartje/geometry/vector/Vector';
import { factory } from '@apestaartje/geometry/vector/factory';

/**
 * Create a force vector
 */

export function force(
  radians: number,
  mass: number,
  acceleration: number,
): Vector {
  return factory(radians, mass * acceleration);
}
