import { fromString } from './fromString';

describe('fromString', (): void => {
  it('create an RGB value for a color in hex notation with hash', (): void => {
    expect(fromString('#34f10a')).toEqual({
      r: 52,
      g: 241,
      b: 10,
    });
  });

  it('create an RGB value for a color in hex notation without hash', (): void => {
    expect(fromString('933bc6')).toEqual({
      r: 147,
      g: 59,
      b: 198,
    });
  });

  it('create an RGB value for a color in hex notation with 3 digits', (): void => {
    expect(fromString('#000')).toEqual({
      r: 0,
      g: 0,
      b: 0,
    });
  });

  it('throw an error when it is not a valid string', (): void => {
    expect((): void => {
      fromString('933bc623');
    }).toThrow();
  });

  it('throw an error when result is not valid', (): void => {
    expect((): void => {
      fromString('#b0623');
    }).toThrow();
  });
});
