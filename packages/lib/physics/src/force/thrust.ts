import { Vector } from '@apestaartje/geometry/vector/Vector';
import { scale } from '@apestaartje/geometry/vector/scale';

export function thrust(velocity: Vector, dm: number, dt: number): Vector {
  return scale(velocity, -dm / dt);
}
