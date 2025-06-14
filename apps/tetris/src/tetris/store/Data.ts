import { Size } from '@apestaartje/geometry/size/Size';

import { Cell } from '../grid/Cell';
import { TetrominoData } from '../tetromino/TetrominoData';
import { Type } from '../tetromino/Type';

import { BlockConfig } from './BlockConfig';

export interface Data {
  current: TetrominoData | undefined;
  next: TetrominoData | undefined;
  cells: Cell<Type | undefined>[];
  score: number | undefined;
  size: Size;
  block: BlockConfig;
}
