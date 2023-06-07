import { range } from './range';

describe('range', () => {
  it('should iterate over values', () => {
    const values = Array.from(range(1, 3));

    expect(values).toEqual([1, 2, 3]);
  });
});
