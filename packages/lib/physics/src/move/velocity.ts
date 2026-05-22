import { add } from '@apestaartje/geometry/vector/add';
import { scale } from '@apestaartje/geometry/vector/scale';
import type { Vector } from '@apestaartje/geometry/vector/Vector';

export function velocity(
  current: Vector,
  acceleration: Vector,
  dt: number,
): Vector {
  return add(current, scale(acceleration, dt));
}
