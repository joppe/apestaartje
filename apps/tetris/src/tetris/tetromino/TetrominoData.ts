import type { Vector } from '@apestaartje/geometry/vector/Vector';

import type { Type } from './Type';

export interface TetrominoData {
  type: Type;
  blocks: Vector[];
}
