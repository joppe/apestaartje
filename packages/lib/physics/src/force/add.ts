import { Vector } from '@apestaartje/geometry/vector/Vector';
import { add as addVector } from '@apestaartje/geometry/vector/add';

import { zero } from './zero';

/**
 * Add multiple vector forces
 */

export function add(...forces: Vector[]): Vector {
  return forces.reduce((sum: Vector, force: Vector): Vector => {
    return addVector(sum, force);
  }, zero());
}
