import { range } from '@apestaartje/iterator/range/range';

import { Axis } from '../Axis';

export function otherAxisIndicesOutsideBlock(
  blockIndex: number,
  axis: Axis,
): number[] {
  const indices: number[] = [];
  const base = axis === 'row' ? blockIndex % 3 : Math.floor(blockIndex / 3);

  for (const index of range(0, 8)) {
    if (Math.floor(index / 3) === base) {
      continue;
    }

    indices.push(index);
  }

  return indices;
}
