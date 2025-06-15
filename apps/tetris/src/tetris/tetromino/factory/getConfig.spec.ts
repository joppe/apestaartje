import { Type } from '../Type';

import { getConfig } from './getConfig';

describe('getConfig', (): void => {
  it('return the config of the blocks in the form of a multi line string', (): void => {
    expect(getConfig(Type.I)).toBe(0x00f0);
  });
});
