import { Vector } from '@apestaartje/geometry/vector/Vector';
import { add } from '@apestaartje/geometry/vector/add';
import { negate } from '@apestaartje/geometry/vector/negate';

export function crop(blocks: Vector[]): Vector[] {
  const min: Vector = blocks.reduce((acc: Vector, block: Vector): Vector => {
    return {
      x: Math.min(acc.x, block.x),
      y: Math.min(acc.y, block.y),
    };
  });
  const offset: Vector = negate(min);

  return blocks.map((block: Vector): Vector => {
    return add(block, offset);
  });
}
