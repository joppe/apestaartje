import { radians } from './radians';

describe('angle', (): void => {
  describe('radians', (): void => {
    it('transform degrees to radians', (): void => {
      expect(radians(0)).toBe(0);
      expect(radians(90)).toBe(Math.PI / 2);
      expect(radians(180)).toBe(Math.PI);
    });
  });
});
