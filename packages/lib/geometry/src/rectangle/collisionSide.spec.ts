import { describe, expect, it } from 'vitest';

import type { Rectangle } from './Rectangle';

import { collisionSide } from './collisionSide';

describe('collisionSide', () => {
  it('returns null when rectangles are not colliding', () => {
    const a: Rectangle = {
      topLeft: { x: 0, y: 10 },
      bottomRight: { x: 10, y: 0 },
    };
    const b: Rectangle = {
      topLeft: { x: 20, y: 30 },
      bottomRight: { x: 30, y: 20 },
    };

    expect(collisionSide(a, b)).toBe(null);
  });

  it('returns "top" when collision occurs from the top', () => {
    const a: Rectangle = {
      topLeft: { x: 5, y: 12 },
      bottomRight: { x: 15, y: 0 },
    };
    const b: Rectangle = {
      topLeft: { x: 0, y: 20 },
      bottomRight: { x: 20, y: 10 },
    };

    expect(collisionSide(a, b)).toBe('top');
  });

  it('returns "bottom" when collision occurs from the bottom', () => {
    const a: Rectangle = {
      topLeft: { x: 5, y: 30 },
      bottomRight: { x: 15, y: 18 },
    };
    const b: Rectangle = {
      topLeft: { x: 0, y: 20 },
      bottomRight: { x: 20, y: 10 },
    };

    expect(collisionSide(a, b)).toBe('bottom');
  });

  it('returns "left" when collision occurs from the left', () => {
    const a: Rectangle = {
      topLeft: { x: 0, y: 15 },
      bottomRight: { x: 12, y: 5 },
    };
    const b: Rectangle = {
      topLeft: { x: 10, y: 20 },
      bottomRight: { x: 20, y: 0 },
    };

    expect(collisionSide(a, b)).toBe('left');
  });

  it('returns "right" when collision occurs from the right', () => {
    const a: Rectangle = {
      topLeft: { x: 18, y: 15 },
      bottomRight: { x: 30, y: 5 },
    };
    const b: Rectangle = {
      topLeft: { x: 10, y: 20 },
      bottomRight: { x: 20, y: 0 },
    };

    expect(collisionSide(a, b)).toBe('right');
  });

  it('returns the side with minimum penetration when overlapping significantly', () => {
    const a: Rectangle = {
      topLeft: { x: 5, y: 11 },
      bottomRight: { x: 15, y: 5 },
    };
    const b: Rectangle = {
      topLeft: { x: 0, y: 20 },
      bottomRight: { x: 20, y: 10 },
    };

    // Top penetration: 1, others are larger
    expect(collisionSide(a, b)).toBe('top');
  });

  it('returns correct side when rectangle a is moving into b from top-left corner', () => {
    const a: Rectangle = {
      topLeft: { x: 5, y: 12 },
      bottomRight: { x: 12, y: 5 },
    };
    const b: Rectangle = {
      topLeft: { x: 10, y: 20 },
      bottomRight: { x: 20, y: 10 },
    };

    // Both top and left have penetration of 2
    // Should return either top or left based on which is checked first
    const result = collisionSide(a, b);
    expect(['top', 'left']).toContain(result);
  });

  it('handles when rectangle a completely overlaps b', () => {
    const a: Rectangle = {
      topLeft: { x: 0, y: 30 },
      bottomRight: { x: 30, y: 0 },
    };
    const b: Rectangle = {
      topLeft: { x: 10, y: 20 },
      bottomRight: { x: 20, y: 10 },
    };

    // All penetrations are equal (10), should return top
    expect(collisionSide(a, b)).toBe('top');
  });

  it('handles when rectangle b completely overlaps a', () => {
    const a: Rectangle = {
      topLeft: { x: 10, y: 20 },
      bottomRight: { x: 20, y: 10 },
    };
    const b: Rectangle = {
      topLeft: { x: 0, y: 30 },
      bottomRight: { x: 30, y: 0 },
    };

    // All penetrations are equal (10), should return top
    expect(collisionSide(a, b)).toBe('top');
  });

  it('returns correct side for slight overlap from right', () => {
    const a: Rectangle = {
      topLeft: { x: 19, y: 15 },
      bottomRight: { x: 25, y: 5 },
    };
    const b: Rectangle = {
      topLeft: { x: 10, y: 20 },
      bottomRight: { x: 20, y: 0 },
    };

    // Right penetration is 1 (smallest)
    expect(collisionSide(a, b)).toBe('right');
  });

  it('returns correct side for slight overlap from bottom', () => {
    const a: Rectangle = {
      topLeft: { x: 5, y: 25 },
      bottomRight: { x: 15, y: 19 },
    };
    const b: Rectangle = {
      topLeft: { x: 0, y: 20 },
      bottomRight: { x: 20, y: 10 },
    };

    // Bottom penetration is 1 (smallest)
    expect(collisionSide(a, b)).toBe('bottom');
  });
});
