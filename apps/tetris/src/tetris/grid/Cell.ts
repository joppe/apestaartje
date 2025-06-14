import { Point } from '@apestaartje/geometry/point/Point';

export interface Cell<T> {
  position: Point;
  value: T;
}
