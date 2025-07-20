import { type Vector } from '@apestaartje/geometry/vector/Vector';
import { random } from '@apestaartje/number/random';
import { type Range } from '@apestaartje/number/range/Range';

export function randomVector(x: Range, y: Range): Vector {
  return {
    x: random(x.min, x.max),
    y: random(y.min, y.max),
  };
}
