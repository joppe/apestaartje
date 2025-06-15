import type { Point } from './Point';
import { clone } from './clone';

describe('point', (): void => {
  describe('clone', (): void => {
    it('clone a point', (): void => {
      const a: Point = {
        x: 0,
        y: 12,
      };
      const c: Point = clone(a);

      expect(c.x).toBe(0);
      expect(c.y).toBe(12);
      expect(c).not.toBe(a);
    });
  });
});
