import type { Rectangle } from './Rectangle';

type OverlapProps = {
  a: Rectangle;
  b: Rectangle;
};

export function overlap({ a, b }: OverlapProps): boolean {
  if (a.topLeft.x > b.bottomRight.x || b.topLeft.x > a.bottomRight.x) {
    return false; // No overlap on the x-axis
  }

  if (a.topLeft.y > b.bottomRight.y || b.topLeft.y > a.bottomRight.y) {
    return false; // No overlap on the y-axis
  }

  return true; // Overlap exists
}
