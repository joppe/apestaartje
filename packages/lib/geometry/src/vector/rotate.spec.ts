import { rotate } from './rotate';
import type { Vector } from './Vector';

describe('vector', (): void => {
  describe('rotate', (): void => {
    it('rotate a vector by a given amount of radians', (): void => {
      const a: Vector = {
        x: 0,
        y: 10,
      };
      const b: Vector = rotate(a, Math.PI);

      expect(b.x).toBeCloseTo(0);
      expect(b.y).toBeCloseTo(-10);
      expect(a.x).toBeCloseTo(0);
      expect(a.y).toBeCloseTo(10);
    });
  });
});
