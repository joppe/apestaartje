import { endOfWeek } from './endOfWeek';

describe('endOfWeek', (): void => {
  it('returns the day that is on the end of the current week', (): void => {
    const date = new Date(2021, 6, 26);
    const end = endOfWeek(date);

    expect(end.getDate()).toBe(1);
  });
});
