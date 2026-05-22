import type { Line } from './Line';

import { clone as clonePoint } from '../point/clone';

/**
 * Clone a Line object
 */

export function clone(line: Line): Line {
  return {
    start: clonePoint(line.start),
    end: clonePoint(line.end),
  };
}
