import { map } from './map';

describe('map', () => {
  it('should map values', () => {
    const values = map([1, 2, 3], (value) => value * 2);

    expect(values).toEqual([2, 4, 6]);
  });
});
