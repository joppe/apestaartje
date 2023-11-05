import { Point } from '@apestaartje/geometry/point/Point';

export type TextOptions = {
  position: Point;
  title: string;
  color: string;
  size: number;
  context: CanvasRenderingContext2D;
};

export function text({
  position,
  color,
  title,
  size,
  context,
}: TextOptions): void {
  context.save();
  context.font = `${size}px Arial`;
  context.fillStyle = color;
  context.fillText(title, position.x, position.y);
  context.restore();
}
