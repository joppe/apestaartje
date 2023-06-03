import { addDays } from './addDays';

describe('addDays', (): void => {
  it('add a number of days to a date', (): void => {
    const date = new Date(2021, 0, 1);
    const newDate = addDays(date, 10);

    expect(newDate.getDate()).toBe(11);
  });

  it('use a negative number to subtract amount of days', (): void => {
    const date = new Date(2021, 0, 31);
    const newDate = addDays(date, -20);

    expect(newDate.getDate()).toBe(11);
  });
});
