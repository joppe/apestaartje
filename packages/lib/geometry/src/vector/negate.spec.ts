import { Vector } from './Vector';
import { negate } from './negate';

describe('vector', (): void => {
  describe('length', (): void => {
    it('create a vector with a given length and angle', (): void => {
      const a: Vector = {
        x: 0,
        y: 10,
      };
      const b: Vector = {
        x: -3,
        y: 4,
      };

      expect(negate(a)).toEqual({ x: -0, y: -10 });
      expect(negate(b)).toEqual({ x: 3, y: -4 });
    });
  });
});
