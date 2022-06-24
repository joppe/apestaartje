import { distance } from './distance';
import type { Point } from './Point';

describe('point', (): void => {
  describe('distance', (): void => {
    it('calculate the distance between two points', (): void => {
      const a: Point = {
        x: 9,
        y: 12,
      };
      const b: Point = {
        x: 6,
        y: 8,
      };
      const d: number = distance(a, b);

      expect(d).toBe(5);
    });
  });
});
