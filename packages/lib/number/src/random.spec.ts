import { random } from './random';

describe('random', (): void => {
  it('Generates a random integer value greater or equal than min and less or equal than max', (): void => {
    for (let i = 0; i < 1000; i += 1) {
      const value = random(18, 45);

      expect(Number.isInteger(value)).toBe(true);
      expect(value).toBeGreaterThanOrEqual(18);
      expect(value).toBeLessThanOrEqual(45);
    }
  });

  it('Throw an error when max is not greater or equal than min', (): void => {
    expect((): void => {
      random(5, 5);
    }).not.toThrow();

    expect((): void => {
      random(34, 1);
    }).toThrow();
  });
});
