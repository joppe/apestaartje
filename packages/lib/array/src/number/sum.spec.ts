import { sum } from './sum';

describe('sum', (): void => {
  it('Returns the sum of a list', (): void => {
    expect(sum([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual(55);
    expect(sum([-10, 10])).toEqual(0);
    expect(sum([])).toEqual(0);
  });
});
