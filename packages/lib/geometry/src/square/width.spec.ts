import { Square } from './Square';
import { width } from './width';

describe('square', (): void => {
  describe('width', (): void => {
    it('calculate the width of a square', (): void => {
      const s: Square = {
        topLeft: {
          x: 0,
          y: 0,
        },
        bottomRight: {
          x: 100,
          y: 56,
        },
      };

      expect(width(s)).toBe(100);
    });

    it('the width is alway equal or greater than zero', (): void => {
      const s1: Square = {
        topLeft: {
          x: 100,
          y: 0,
        },
        bottomRight: {
          x: 100,
          y: 56,
        },
      };
      const s2: Square = {
        topLeft: {
          x: 100,
          y: 0,
        },
        bottomRight: {
          x: 0,
          y: 56,
        },
      };

      expect(width(s1)).toBe(0);
      expect(width(s2)).toBe(100);
    });
  });
});
