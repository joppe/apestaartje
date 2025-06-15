import type { Vector } from './Vector';
import { factory } from './factory';

describe('vector', (): void => {
  describe('dotProduct', (): void => {
    it('create a vector with a given length and angle', (): void => {
      const a: Vector = factory(0, 10);
      const b: Vector = factory(Math.PI / 4, 10);

      expect(a.x).toBe(10);
      expect(a.y).toBe(0);
      expect(b.x).toBeCloseTo(Math.sqrt(50));
      expect(b.y).toBeCloseTo(Math.sqrt(50));
    });
  });
});
