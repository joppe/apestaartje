import type { Rectangle } from './Rectangle';

export function overlap(a: Rectangle, b: Rectangle): Rectangle | null {
  const left = Math.max(a.topLeft.x, b.topLeft.x);
  const top = Math.min(a.topLeft.y, b.topLeft.y);
  const right = Math.min(a.bottomRight.x, b.bottomRight.x);
  const bottom = Math.max(a.bottomRight.y, b.bottomRight.y);

  if (left > right || bottom > top) {
    return null;
  }

  return {
    topLeft: {
      x: left,
      y: top,
    },
    bottomRight: {
      x: right,
      y: bottom,
    },
  };
}
