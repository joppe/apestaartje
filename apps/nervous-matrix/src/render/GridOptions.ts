import { Size } from '@apestaartje/geometry/size/Size';

import { Mapping } from '../Mapping';
import { Matrix } from '../matrix/Matrix';

export interface GridOptions {
  matrix: Matrix;
  mapping: Mapping;
  cols: number;
  rows: number;
  size: Size;
}
