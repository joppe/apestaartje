import { degrees } from './degrees';

describe('angle', (): void => {
  describe('degrees', (): void => {
    it('transform radians to degrees', (): void => {
      expect(degrees(0)).toBe(0);
      expect(degrees(Math.PI / 2)).toBe(90);
      expect(degrees(Math.PI)).toBe(180);
    });
  });
});
