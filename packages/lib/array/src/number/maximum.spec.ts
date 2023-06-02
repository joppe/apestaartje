import { maximum } from './maximum';

describe('maximum', (): void => {
  it('Returns the maximum value of a list', (): void => {
    expect(maximum([1, 2, 3, 4, 5])).toEqual(5);
    expect(
      maximum([23424, Math.PI, 32, 0.239, 69686, -1243, 123, 0, -123]),
    ).toEqual(69686);
  });

  it('Throw an exception when the array is empty', (): void => {
    expect((): void => {
      maximum([]);
    }).toThrow();
  });
});
