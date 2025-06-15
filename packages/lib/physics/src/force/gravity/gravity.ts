import type { Vector } from '@apestaartje/geometry/vector/Vector';
import { length } from '@apestaartje/geometry/vector/length';
import { scale } from '@apestaartje/geometry/vector/scale';

import { GRAVITATIONAL_CONSTANT } from './gravitational-constant';

/**
 * Create a gravity vector
 */

export function force(
  mass1: number,
  mass2: number,
  distance: number,
  G: number = GRAVITATIONAL_CONSTANT,
): number {
  return (G * mass1 * mass2) / (distance * distance);
}

export function gravity(
  mass1: number,
  mass2: number,
  velocity: Vector,
  G: number = GRAVITATIONAL_CONSTANT,
): Vector {
  const distance: number = length(velocity);

  return scale(velocity, -force(mass1, mass2, distance, G) / distance);
}
