import { PadType, pad } from './pad';

describe('pad', (): void => {
  it('default pads right', (): void => {
    expect(pad('1', '0', 4)).toBe('1000');
  });

  it('place chars if front of given string', (): void => {
    expect(pad('1', '0', 4, PadType.Left)).toBe('0001');
  });

  it('place chars at the end of a given string', (): void => {
    expect(pad('1', '0', 4, PadType.Right)).toBe('1000');
  });

  it('return the same string if the length is of the desired size', (): void => {
    expect(pad('1111', '0', 4, PadType.Left)).toBe('1111');
  });

  it('return the same string if the length is larger then the desired size', (): void => {
    expect(pad('foobar', '0', 4, PadType.Left)).toBe('foobar');
  });
});
