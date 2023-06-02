import { Line } from './Line';
import { clone } from './clone';

describe('line', (): void => {
  describe('clone', (): void => {
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
      const c: Line = clone(l);

      expect(c.start.x).toBe(l.start.x);
      expect(c.start.y).toBe(l.start.y);
      expect(c.start).not.toBe(l.start);
      expect(c.end.x).toBe(l.end.x);
      expect(c.end.y).toBe(l.end.y);
      expect(c.end).not.toBe(l.end);
    });
  });
});
