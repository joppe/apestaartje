import type { Line } from './Line';

import { distance } from '../point/distance';

/**
 * Calculate the length of a line
 */

export function length(line: Line): number {
  return distance(line.end, line.start);
}
