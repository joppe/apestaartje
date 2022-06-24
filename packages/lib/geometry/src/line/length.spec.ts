import { length } from './length';
import type { Line } from './Line';

describe('line', (): void => {
  describe('length', (): void => {
    it('create a clone of a line object', (): void => {
      const l: Line = {
        start: {
          x: 0,
          y: 12,
        },
        end: {
          x: -56,
          y: 234,
        },
      };
      const len: number = length(l);

      expect(len).toBe(228.95414388038492);
      expect(length({ start: { x: 0, y: 0 }, end: { x: 0, y: 0 } })).toBe(0);
    });
  });
});
