import type { Rectangle } from './Rectangle';

export function isColliding(a: Rectangle, b: Rectangle): boolean {
  return (
    a.topLeft.x < b.bottomRight.x &&
    a.bottomRight.x > b.topLeft.x &&
    a.topLeft.y > b.bottomRight.y &&
    a.bottomRight.y < b.topLeft.y
  );
}
