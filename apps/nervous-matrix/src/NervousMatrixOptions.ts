import { Size } from '@apestaartje/geometry/size/Size';

import { Mapping } from './Mapping';

export type NervousMatrixOptions = {
  cols: number;
  rows: number;
  distance: number;
  displacement: number;
  offset: number;
  c: number;
  k: number;
  mapping: Mapping;
  size: Size;
  container: HTMLElement;
};
