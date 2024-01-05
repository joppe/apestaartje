import { Axis } from '../Axis';

export function blockAxisIndexToGridAxisIndex(
  blockIndex: number,
  offsetIndex: number,
  axis: Axis,
): number {
  if (axis === 'row') {
    return Math.floor(blockIndex / 3) * 3 + offsetIndex;
  }

  return (blockIndex % 3) * 3 + offsetIndex;
}
