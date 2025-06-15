import type { Size } from '@apestaartje/geometry/size/Size';

import type { Mapping } from '../Mapping';
import type { Matrix } from '../matrix/Matrix';

export interface GridOptions {
  matrix: Matrix;
  mapping: Mapping;
  cols: number;
  rows: number;
  size: Size;
}
