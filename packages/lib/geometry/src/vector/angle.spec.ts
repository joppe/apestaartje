import { angle } from './angle';

describe('vector', (): void => {
  describe('angle', (): void => {
    it('calculate the angle of a vector', (): void => {
      expect(angle({ x: 0, y: 1 })).toBe(Math.PI / 2);
      expect(angle({ x: 0, y: 0 })).toBe(0);
      expect(angle({ x: 1, y: 0 })).toBe(0);
      expect(angle({ x: 1, y: 1 })).toBe(Math.PI / 4);
    });

    it('calculate the angle between two vectors', (): void => {
      expect(angle({ x: 0, y: 1 }, { x: 1, y: 1 })).toBeCloseTo(Math.PI / 4);
    });
  });
});
