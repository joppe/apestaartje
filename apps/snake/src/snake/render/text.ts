import { Point } from '@apestaartje/geometry/point/Point';

export type TextOptions = {
  position: Point;
  title: string;
  color: string;
  context: CanvasRenderingContext2D;
};

export function text({ position, color, title, context }: TextOptions): void {
  context.save();
  context.font = '20px Arial';
  context.fillStyle = color;
  context.fillText(title, position.x, position.y);
  context.restore();
}
