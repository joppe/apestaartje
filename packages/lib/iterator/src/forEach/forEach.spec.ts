import { forEach } from './forEach';

describe('forEach', () => {
  it('should iterate over values', () => {
    const values: number[] = [];

    forEach([1, 2, 3], (value) => {
      values.push(value);
    });

    expect(values).toEqual([1, 2, 3]);
  });
});
