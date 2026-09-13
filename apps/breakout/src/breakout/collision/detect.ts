import type { Point } from '@apestaartje/geometry/point/Point';
import { collisionSide } from '@apestaartje/geometry/rectangle/collisionSide';
import type { Rectangle } from '@apestaartje/geometry/rectangle/Rectangle';
import type { Vector } from '@apestaartje/geometry/vector/Vector';

import type { Ball } from '../ball/Ball';

export type BounceImpact = {
  normal: Vector;
  point: Point;
};

export function detectCollision(
  ball: Ball,
  box: Rectangle,
): BounceImpact | null {
  const side = collisionSide(ball.rectangle, box);

  switch (side) {
    case 'right':
      return {
        normal: { y: 0, x: 1 },
        point: {
          x: box.bottomRight.x + ball.size,
          y: ball.position.y,
        },
      };
    case 'left':
      return {
        normal: { y: 0, x: -1 },
        point: {
          x: box.topLeft.x - ball.size,
          y: ball.position.y,
        },
      };
    case 'bottom':
      return {
        normal: { y: 1, x: 0 },
        point: {
          x: ball.position.x,
          y: box.topLeft.y + ball.size,
        },
      };
    case 'top':
      return {
        normal: { y: -1, x: 0 },
        point: {
          x: ball.position.x,
          y: box.bottomRight.y - ball.size,
        },
      };
    default:
      return null;
  }
}
