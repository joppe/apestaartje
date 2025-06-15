import type { Vector } from './Vector';
import { length } from './length';
import { subtract } from './subtract';

/**
 * Calculate the distance between two vectors
 */

export function distance(a: Vector, b: Vector): number {
  return length(subtract(a, b));
}
