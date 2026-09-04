import type { Size } from '@apestaartje/geometry/size/Size';

import { Box } from '../box/Box';
import { Wall } from './Wall';

type FactoryOptions = {
  stage: Size;
  // The space between the wall and the edge of the canvas element
  offset: number;
  // The size of the wall
  size: number;
};

export function factory({ stage, offset, size }: FactoryOptions): Wall[] {
  const walls = [
    new Wall({
      box: new Box({
        northEast: { x: offset, y: offset },
        size: { width: stage.width - 2 * offset, height: size },
      }),
    }),
    new Wall({
      box: new Box({
        northEast: { x: stage.width - (offset + size), y: offset },
        size: { width: size, height: stage.height - 2 * offset },
      }),
    }),
    new Wall({
      box: new Box({
        northEast: { x: offset, y: stage.height - (offset + size) },
        size: { width: stage.width - 2 * offset, height: size },
      }),
    }),
    new Wall({
      box: new Box({
        northEast: { x: offset, y: offset },
        size: { width: size, height: stage.height - 2 * offset },
      }),
    }),
  ];

  return walls;
}
