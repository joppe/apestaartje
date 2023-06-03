import { diffInDays } from './diffInDays';

describe('diffInDays', (): void => {
  it('return the amount of days two dates differ', (): void => {
    const a = new Date(2021, 0, 1);
    const b = new Date(2021, 1, 1);

    expect(diffInDays(a, b)).toBe(31);
    expect(diffInDays(b, a)).toBe(31);
  });
});
