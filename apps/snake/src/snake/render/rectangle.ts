import { Point } from '@apestaartje/geometry/point/Point';
import { Size } from '@apestaartje/geometry/size/Size';

export type RectangleOptions = {
  position: Point;
  size: Size;
  color: string;
  background: string;
  context: CanvasRenderingContext2D;
};
export function rectangle({
  position,
  size,
  color,
  background,
  context,
}: RectangleOptions): void {
  context.save();
  context.beginPath();
  context.fillStyle = color;
  context.strokeStyle = background;
  context.rect(position.x, position.y, size.width, size.height);
  context.fill();
  context.stroke();
  context.restore();
}
