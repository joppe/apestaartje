import { toString } from './toString';

describe('toString', (): void => {
  it('create a hex notation from an RGB value', (): void => {
    expect(toString({ r: 27, g: 230, b: 4 })).toBe('#1be604');
    expect(toString({ r: 0, g: 0, b: 0 })).toBe('#000000');
  });
});
