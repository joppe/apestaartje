import { distance } from '../point/distance';
import type { Line } from './Line';

/**
 * Calculate the length of a line
 */

export function length(line: Line): number {
  return distance(line.end, line.start);
}
