import { product } from './product';

describe('product', (): void => {
  it('Returns the product of a list', (): void => {
    expect(product([1, 2, 3, 4])).toEqual(24);
    expect(product([-10, 10])).toEqual(-100);
    expect(product([2, 234, Math.PI, 0, 10])).toEqual(0);
    expect(product([])).toEqual(1);
  });
});
