import { height } from './height';
import type { Square } from './Square';

describe('square', (): void => {
  describe('height', (): void => {
    it('calculate the height of a square', (): void => {
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

      expect(height(s)).toBe(56);
    });

    it('the height is alway equal or greater than zero', (): void => {
      const s1: Square = {
        topLeft: {
          x: 100,
          y: 56,
        },
        bottomRight: {
          x: 100,
          y: 56,
        },
      };
      const s2: Square = {
        topLeft: {
          x: 100,
          y: 56,
        },
        bottomRight: {
          x: 0,
          y: 1,
        },
      };

      expect(height(s1)).toBe(0);
      expect(height(s2)).toBe(55);
    });
  });
});
