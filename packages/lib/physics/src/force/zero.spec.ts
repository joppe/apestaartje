import type { Vector } from '@apestaartje/geometry/vector/Vector';
import { length } from '@apestaartje/geometry/vector/length';

import { zero } from './zero';

describe('zero', (): void => {
  it('create a vector with no length', (): void => {
    const z: Vector = zero();

    expect(z.x).toBe(0);
    expect(z.y).toBe(0);
    expect(length(z)).toBe(0);
  });
});
