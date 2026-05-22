import { scale } from '@apestaartje/geometry/vector/scale';
import type { Vector } from '@apestaartje/geometry/vector/Vector';

export function restoring(k: number, distance: Vector): Vector {
  return scale(distance, -k);
}
