import { factory } from '@apestaartje/geometry/vector/factory';
import type { Vector } from '@apestaartje/geometry/vector/Vector';

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
