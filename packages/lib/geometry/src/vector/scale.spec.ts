import { Vector } from './Vector';
import { scale } from './scale';

describe('vector', (): void => {
  describe('rotate', (): void => {
    it('scale a vector by a given amount', (): void => {
      const a: Vector = {
        x: -2,
        y: 10,
      };
      const b: Vector = scale(a, 3);

      expect(b.x).toBeCloseTo(-6);
      expect(b.y).toBeCloseTo(30);
      expect(a.x).toBeCloseTo(-2);
      expect(a.y).toBeCloseTo(10);
    });
  });
});
