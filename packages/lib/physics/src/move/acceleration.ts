import { scale } from '@apestaartje/geometry/vector/scale';
import type { Vector } from '@apestaartje/geometry/vector/Vector';

export function acceleration(force: Vector, mass: number): Vector {
  return scale(force, 1 / mass);
}
