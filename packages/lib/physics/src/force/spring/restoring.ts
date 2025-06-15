import type { Vector } from '@apestaartje/geometry/vector/Vector';
import { scale } from '@apestaartje/geometry/vector/scale';

export function restoring(k: number, distance: Vector): Vector {
  return scale(distance, -k);
}
