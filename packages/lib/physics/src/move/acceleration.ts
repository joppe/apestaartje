import { Vector } from '@apestaartje/geometry/vector/Vector';
import { scale } from '@apestaartje/geometry/vector/scale';

export function acceleration(force: Vector, mass: number): Vector {
  return scale(force, 1 / mass);
}
