import type { Rectangle } from './Rectangle';

import { isColliding } from './isColliding';

type Side = 'top' | 'right' | 'bottom' | 'left';

export function collisionSide(a: Rectangle, b: Rectangle): Side | null {
  // Check if rectangles are actually colliding
  if (!isColliding(a, b)) {
    return null;
  }

  // Calculate penetration depth for each side of rectangle a
  const topPenetration = a.topLeft.y - b.bottomRight.y;
  const bottomPenetration = b.topLeft.y - a.bottomRight.y;
  const leftPenetration = a.bottomRight.x - b.topLeft.x;
  const rightPenetration = b.bottomRight.x - a.topLeft.x;

  // Find the minimum penetration (the side where collision occurred)
  const minPenetration = Math.min(
    rightPenetration,
    leftPenetration,
    bottomPenetration,
    topPenetration,
  );

  // Return the side with minimum penetration
  if (minPenetration === topPenetration) {
    return 'top';
  }

  if (minPenetration === bottomPenetration) {
    return 'bottom';
  }

  if (minPenetration === leftPenetration) {
    return 'left';
  }

  return 'right';
}
