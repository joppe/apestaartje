import { Vector } from '@apestaartje/geometry/vector/Vector';

import { Type } from './Type';

export interface TetrominoData {
  type: Type;
  blocks: Vector[];
}
