import { Point } from './Point';
import { add } from './add';

describe('point', (): void => {
  describe('add', (): void => {
    it('add two points and return a new point object', (): void => {
      const a: Point = {
        x: 0,
        y: 12,
      };
      const b: Point = {
        x: -56,
        y: 234,
      };
      const c: Point = add(a, b);

      expect(c.x).toBe(-56);
      expect(c.y).toBe(246);
    });
  });
});
