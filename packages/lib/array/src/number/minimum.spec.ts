import { minimum } from './minimum';

describe('minimum', (): void => {
  it('Returns the minimum value of a list', (): void => {
    expect(minimum([1, 2, 3, 4, 5])).toEqual(1);
    expect(
      minimum([23424, Math.PI, 32, 0.239, 69686, -1243, 123, 0, -123]),
    ).toEqual(-1243);
  });

  it('Throw an exception when the array is empty', (): void => {
    expect((): void => {
      minimum([]);
    }).toThrow();
  });
});
