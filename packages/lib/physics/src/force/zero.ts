import { Vector } from '@apestaartje/geometry/vector/Vector';

/**
 * Create a vector with zero length
 */

export function zero(): Vector {
  return {
    x: 0,
    y: 0,
  };
}
