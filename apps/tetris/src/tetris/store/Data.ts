import type { Size } from '@apestaartje/geometry/size/Size';

import type { Cell } from '../grid/Cell';
import type { TetrominoData } from '../tetromino/TetrominoData';
import type { Type } from '../tetromino/Type';

import type { BlockConfig } from './BlockConfig';

export interface Data {
  current: TetrominoData | undefined;
  next: TetrominoData | undefined;
  cells: Cell<Type | undefined>[];
  score: number | undefined;
  size: Size;
  block: BlockConfig;
}
