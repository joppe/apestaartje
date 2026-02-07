import { scale } from './scale';

describe('scale', (): void => {
  it('return a value scaled to a given range', (): void => {
    const from = { min: 0, max: 100 };
    const to = { min: 0, max: 1 };

    expect(scale({ value: 0, from, to })).toBe(0);
    expect(scale({ value: 50, from, to })).toBe(0.5);
    expect(scale({ value: 100, from, to })).toBe(1);
    expect(scale({ value: -50, from, to })).toBe(0);
    expect(scale({ value: 150, from, to })).toBe(1);
  });

  it('handles zero range in from', (): void => {
    const from = { min: 50, max: 100 };
    const to = { min: 0, max: 1 };

    expect(scale({ value: 50, from, to })).toBe(0); // Should return the min of the target range
    expect(scale({ value: 100, from, to })).toBe(1); // Should return the max of the target range
    expect(scale({ value: 0, from, to })).toBe(0); // Should return the min of the target range
  });
});
