import { describe, expect, it } from 'vitest';

import type { Rectangle } from './Rectangle';

import { isColliding } from './isColliding';

describe('isColliding', () => {
  it('particle', () => {
    const particle: Rectangle = {
      topLeft: { x: 505, y: 582 },
      bottomRight: { x: 515, y: 572 },
    };
    const wall: Rectangle = {
      topLeft: { x: 10, y: 590 },
      bottomRight: { x: 790, y: 580 },
    };

    expect(isColliding(particle, wall)).toBe(true);
  });

  it('returns true when rectangles overlap', () => {
    const a: Rectangle = {
      topLeft: { x: 0, y: 10 },
      bottomRight: { x: 10, y: 0 },
    };
    const b: Rectangle = {
      topLeft: { x: 5, y: 15 },
      bottomRight: { x: 15, y: 5 },
    };

    expect(isColliding(a, b)).toBe(true);
  });

  it('returns true when rectangle a is completely inside b', () => {
    const a: Rectangle = {
      topLeft: { x: 5, y: 10 },
      bottomRight: { x: 10, y: 5 },
    };
    const b: Rectangle = {
      topLeft: { x: 0, y: 20 },
      bottomRight: { x: 20, y: 0 },
    };

    expect(isColliding(a, b)).toBe(true);
  });

  it('returns true when rectangle b is completely inside a', () => {
    const a: Rectangle = {
      topLeft: { x: 0, y: 20 },
      bottomRight: { x: 20, y: 0 },
    };
    const b: Rectangle = {
      topLeft: { x: 5, y: 10 },
      bottomRight: { x: 10, y: 5 },
    };

    expect(isColliding(a, b)).toBe(true);
  });

  it('returns true when rectangles share an edge', () => {
    const a: Rectangle = {
      topLeft: { x: 0, y: 10 },
      bottomRight: { x: 10, y: 0 },
    };
    const b: Rectangle = {
      topLeft: { x: 10, y: 10 },
      bottomRight: { x: 20, y: 0 },
    };

    expect(isColliding(a, b)).toBe(false);
  });

  it('returns false when rectangles are separated horizontally', () => {
    const a: Rectangle = {
      topLeft: { x: 0, y: 10 },
      bottomRight: { x: 10, y: 0 },
    };
    const b: Rectangle = {
      topLeft: { x: 15, y: 10 },
      bottomRight: { x: 25, y: 0 },
    };

    expect(isColliding(a, b)).toBe(false);
  });

  it('returns false when rectangles are separated vertically', () => {
    const a: Rectangle = {
      topLeft: { x: 0, y: 10 },
      bottomRight: { x: 10, y: 0 },
    };
    const b: Rectangle = {
      topLeft: { x: 0, y: 25 },
      bottomRight: { x: 10, y: 15 },
    };

    expect(isColliding(a, b)).toBe(false);
  });

  it('returns false when rectangles are separated diagonally', () => {
    const a: Rectangle = {
      topLeft: { x: 0, y: 10 },
      bottomRight: { x: 10, y: 0 },
    };
    const b: Rectangle = {
      topLeft: { x: 15, y: 25 },
      bottomRight: { x: 25, y: 15 },
    };

    expect(isColliding(a, b)).toBe(false);
  });

  it('returns true when rectangles touch at a corner (inclusive boundary)', () => {
    const a: Rectangle = {
      topLeft: { x: 0, y: 10 },
      bottomRight: { x: 10, y: 0 },
    };
    const b: Rectangle = {
      topLeft: { x: 10, y: 20 },
      bottomRight: { x: 20, y: 10 },
    };

    expect(isColliding(a, b)).toBe(false);
  });

  it('returns true when rectangles overlap slightly on one axis', () => {
    const a: Rectangle = {
      topLeft: { x: 0, y: 10 },
      bottomRight: { x: 10, y: 0 },
    };
    const b: Rectangle = {
      topLeft: { x: 9, y: 15 },
      bottomRight: { x: 15, y: 5 },
    };

    expect(isColliding(a, b)).toBe(true);
  });
});
