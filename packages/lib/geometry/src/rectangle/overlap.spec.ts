import { describe, it, expect } from 'vitest';

import type { Rectangle } from './Rectangle';

import { overlap } from './overlap';

describe('rectangle', (): void => {
  it('should return overlap rectangle when rectangles intersect', (): void => {
    const a: Rectangle = {
      topLeft: { x: 0, y: 10 },
      bottomRight: { x: 10, y: 0 },
    };
    const b: Rectangle = {
      topLeft: { x: 5, y: 15 },
      bottomRight: { x: 15, y: 5 },
    };

    const result = overlap(a, b);

    expect(result).toEqual({
      topLeft: { x: 5, y: 10 },
      bottomRight: { x: 10, y: 5 },
    });
  });

  it('should return null when rectangles do not intersect horizontally', (): void => {
    const a: Rectangle = {
      topLeft: { x: 0, y: 10 },
      bottomRight: { x: 10, y: 0 },
    };
    const b: Rectangle = {
      topLeft: { x: 20, y: 10 },
      bottomRight: { x: 30, y: 0 },
    };

    expect(overlap(a, b)).toBeNull();
  });

  it('should return null when rectangles do not intersect vertically', (): void => {
    const a: Rectangle = {
      topLeft: { x: 0, y: 10 },
      bottomRight: { x: 10, y: 0 },
    };
    const b: Rectangle = {
      topLeft: { x: 0, y: 30 },
      bottomRight: { x: 10, y: 20 },
    };

    expect(overlap(a, b)).toBeNull();
  });

  it('should return overlap when rectangles touch but do not overlap', (): void => {
    const a: Rectangle = {
      topLeft: { x: 0, y: 10 },
      bottomRight: { x: 10, y: 0 },
    };
    const b: Rectangle = {
      topLeft: { x: 10, y: 10 },
      bottomRight: { x: 20, y: 0 },
    };

    expect(overlap(a, b)).toEqual({
      topLeft: { x: 10, y: 10 },
      bottomRight: { x: 10, y: 0 },
    });
  });

  it('should return overlap rectangle when one rectangle is contained within another', (): void => {
    const a: Rectangle = {
      topLeft: { x: 0, y: 20 },
      bottomRight: { x: 20, y: 0 },
    };
    const b: Rectangle = {
      topLeft: { x: 5, y: 10 },
      bottomRight: { x: 10, y: 5 },
    };

    const result = overlap(a, b);

    expect(result).toEqual({
      topLeft: { x: 5, y: 10 },
      bottomRight: { x: 10, y: 5 },
    });
  });
});
