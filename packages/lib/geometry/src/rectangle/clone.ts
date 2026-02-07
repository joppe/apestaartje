import type { Rectangle } from './Rectangle';

/**
 * Clone a Square Object
 */

export function clone(rectangle: Rectangle): Rectangle {
  return {
    bottomRight: {
      x: rectangle.bottomRight.x,
      y: rectangle.bottomRight.y,
    },
    topLeft: {
      x: rectangle.topLeft.x,
      y: rectangle.topLeft.y,
    },
  };
}
