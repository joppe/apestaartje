import { filter } from './filter';

describe('filter', () => {
  it('should filter values', () => {
    const values = filter([1, 2, 3], (value) => value % 2 === 0);

    expect(values).toEqual([2]);
  });
});
