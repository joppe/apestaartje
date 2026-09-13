import type { Vector } from './Vector';

export function dotProduct(a: Vector, b: Vector): number {
  return a.x * b.x + a.y * b.y;
}
