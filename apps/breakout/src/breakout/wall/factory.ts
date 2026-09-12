import type { Size } from '@apestaartje/geometry/size/Size';

import { Box } from '../box/Box';
import { Wall } from './Wall';

type FactoryOptions = {
  stage: Size;
  // The space between the wall and the edge of the canvas element
  offset: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  // The size of the wall
  size: number;
};

export function factory({ stage, offset, size }: FactoryOptions): Wall[] {
  const walls = [
    // top
    new Wall({
      box: new Box({
        northEast: { x: offset.left, y: offset.bottom },
        size: {
          width: stage.width - (offset.left + offset.right),
          height: size,
        },
      }),
    }),
    // right
    new Wall({
      box: new Box({
        northEast: { x: stage.width - (offset.right + size), y: offset.bottom },
        size: {
          width: size,
          height: stage.height - (offset.top + offset.bottom),
        },
      }),
    }),
    // left
    new Wall({
      box: new Box({
        northEast: { x: offset.left, y: offset.bottom },
        size: {
          width: size,
          height: stage.height - (offset.top + offset.bottom),
        },
      }),
    }),
  ];

  return walls;
}
