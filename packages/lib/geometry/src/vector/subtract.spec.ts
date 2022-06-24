import { subtract } from './subtract';
import type { Vector } from './Vector';

describe('vector', (): void => {
  describe('subtract', (): void => {
    it('subtract two vectors and return a new vector object', (): void => {
      const a: Vector = {
        x: 0,
        y: 12,
      };
      const b: Vector = {
        x: -56,
        y: 234,
      };
      const c: Vector = subtract(a, b);

      expect(c.x).toBe(56);
      expect(c.y).toBe(-222);
    });
  });
});
