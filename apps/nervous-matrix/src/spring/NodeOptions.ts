import { Vector } from '@apestaartje/geometry/vector/Vector';

export type NodeOptions = {
  mass: number;
  c: number;
  k: number;
  springLength: number;
  position: Vector;
};
