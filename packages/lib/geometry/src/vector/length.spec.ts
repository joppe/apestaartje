import type { Vector } from './Vector';
import { length } from './length';

describe('vector', (): void => {
  describe('length', (): void => {
    it('calculate the length of a vector', (): void => {
      const a: Vector = {
        x: 0,
        y: 10,
      };
      const b: Vector = {
        x: -3,
        y: 4,
      };

      expect(length(a)).toBe(10);
      expect(length(b)).toBe(5);
    });
  });
});
