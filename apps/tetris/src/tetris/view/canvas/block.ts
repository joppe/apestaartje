import { darken } from '@apestaartje/color/lightness/darken';
import { lighten } from '@apestaartje/color/lightness/lighten';
import type { RGB } from '@apestaartje/color/rgb/RGB';
import { fromString } from '@apestaartje/color/rgb/fromString';
import { toString } from '@apestaartje/color/rgb/toString';
import type { Size } from '@apestaartje/geometry/size/Size';
import type { Vector } from '@apestaartje/geometry/vector/Vector';

export function block(
  context: CanvasRenderingContext2D,
  position: Vector,
  size: Size,
  color: string,
  lineWidth: number,
): void {
  const halfLineWidth: number = lineWidth / 2;
  const rgb: RGB = fromString(color);
  const dark: RGB = darken(rgb, 20);
  const light: RGB = lighten(rgb, 20);

  context.lineWidth = lineWidth;

  context.beginPath();
  context.fillStyle = color;
  context.fillRect(position.x, position.y, size.width, size.height);
  context.closePath();

  const topLeft: Vector = {
    x: position.x + halfLineWidth,
    y: position.y + halfLineWidth,
  };
  const bottomRight: Vector = {
    x: position.x + size.width - halfLineWidth,
    y: position.y + size.height - halfLineWidth,
  };

  context.beginPath();
  context.strokeStyle = toString(light);
  context.moveTo(topLeft.x, topLeft.y);
  context.lineTo(bottomRight.x, topLeft.y);
  context.lineTo(bottomRight.x, bottomRight.y);
  context.stroke();
  context.closePath();

  context.beginPath();
  context.strokeStyle = toString(dark);
  context.moveTo(bottomRight.x, bottomRight.y);
  context.lineTo(topLeft.x, bottomRight.y);
  context.lineTo(topLeft.x, topLeft.y);
  context.stroke();
  context.closePath();
}
