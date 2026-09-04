import type { Point } from '@apestaartje/geometry/point/Point';
import type { Size } from '@apestaartje/geometry/size/Size';

import { Box } from '../box/Box';
import { Brick } from './Brick';

type FactoryOptions = {
  columns: number;
  rows: number;
  size: Size;
  northEast: Point;
  gap: number;
};

export function factory({
  columns,
  rows,
  size,
  northEast,
  gap,
}: FactoryOptions): Brick[] {
  const bricks = Array.from({ length: columns * rows }).map((_, index) => {
    return new Brick({
      box: new Box({
        northEast: {
          x: northEast.x + (index % columns) * (size.width + gap),
          y: northEast.y + Math.floor(index / columns) * (size.height + gap),
        },
        size,
      }),
    });
  });

  return bricks;
}
