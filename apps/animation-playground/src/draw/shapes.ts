import type { Vector } from '@apestaartje/geometry/vector/Vector';

type Border = {
  width: number;
  color: string;
};

type CircleOptions = {
  radius: number;
  color: string;
  position: Vector;
  border?: Border;
};

export function circle(
  context: CanvasRenderingContext2D,
  options: CircleOptions,
) {
  context.beginPath();
  context.arc(
    options.position.x,
    options.position.y,
    options.radius,
    0,
    Math.PI * 2,
  );
  context.fillStyle = options.color;
  context.fill();

  if (options.border) {
    context.lineWidth = options.border.width;
    context.strokeStyle = options.border.color;
    context.stroke();
  }

  context.closePath();
}

type LineOptions = {
  start: Vector;
  end: Vector;
  color: string;
  width: number;
};

export function line(context: CanvasRenderingContext2D, options: LineOptions) {
  context.strokeStyle = options.color;
  context.beginPath();
  context.moveTo(options.start.x, options.start.y);
  context.lineTo(options.end.x, options.end.y);
  context.closePath();
  context.stroke();
}
