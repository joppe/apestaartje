import { Point } from '@apestaartje/geometry/point/Point';
import { Size } from '@apestaartje/geometry/size/Size';

export type RectangleOptions = {
  position: Point;
  size: Size;
  color: string;
  context: CanvasRenderingContext2D;
};
export function rectangle({
  position,
  size,
  color,
  context,
}: RectangleOptions): void {
  context.save();
  context.fillStyle = color;
  context.fillRect(position.x, position.y, size.width, size.height);
  context.restore();
}
