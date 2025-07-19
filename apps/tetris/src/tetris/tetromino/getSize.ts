import type { Rectangle } from '@apestaartje/geometry/rectangle/Rectangle';
import { height } from '@apestaartje/geometry/rectangle/height';
import { width } from '@apestaartje/geometry/rectangle/width';
import type { Vector } from '@apestaartje/geometry/vector/Vector';

export function getSize(blocks: Vector[]): number {
  const rectangle: Rectangle = blocks.reduce(
    (acc: Rectangle, point: Vector): Rectangle => {
      return {
        topLeft: {
          x: Math.min(acc.topLeft.x, point.x),
          y: Math.min(acc.topLeft.y, point.y),
        },
        bottomRight: {
          x: Math.max(acc.bottomRight.x, point.x),
          y: Math.max(acc.bottomRight.y, point.y),
        },
      };
    },
    {
      topLeft: { x: 0, y: 0 },
      bottomRight: { x: 0, y: 0 },
    },
  );

  /**
   * When calculating the width and height, it is calculated between the points (the top right corner of a block). Because a block is
   * always 1 wide/high always add one to the result.
   */
  const w: number = width(rectangle) + 1;
  const h: number = height(rectangle) + 1;

  return Math.max(w, h);
}
