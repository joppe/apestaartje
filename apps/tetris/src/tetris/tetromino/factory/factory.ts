import type { Vector } from '@apestaartje/geometry/vector/Vector';

import type { Type } from '../Type';

import { getConfig } from '../factory/getConfig';
import { Tetromino } from '../Tetromino';
import { createBlocks } from './createBlocks';

export function factory(type: Type): Tetromino {
  const blocks: Vector[] = createBlocks(getConfig(type));

  return new Tetromino(type, blocks);
}
