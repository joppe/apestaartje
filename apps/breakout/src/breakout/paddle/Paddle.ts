import type { Asset } from '@apestaartje/animation/stage/Asset';
import type { Point } from '@apestaartje/geometry/point/Point';
import type { Rectangle } from '@apestaartje/geometry/rectangle/Rectangle';

import type { Box } from '../box/Box';

type PaddleOptions = {
  box: Box;
  width: number;
};

export class Paddle implements Asset {
  private readonly _box: Box;
  private readonly _width: number;

  public get rectangle(): Rectangle {
    return this._box.rectangle;
  }

  constructor({ box, width }: PaddleOptions) {
    this._box = box;
    this._width = width;
  }

  public move(offset: Point): void {
    if (
      this._box.rectangle.topLeft.x + offset.x < 0 ||
      this._box.rectangle.bottomRight.x + offset.x > this._width
    ) {
      return;
    }

    this._box.move(offset);
  }

  public cleanup(): boolean {
    return false;
  }

  public tick(): void {
    // nothing
  }

  public render(context: CanvasRenderingContext2D): void {
    context.save();
    context.beginPath();
    context.fillStyle = '#ffffff';
    context.strokeStyle = '#ffffff';
    context.rect(
      this._box.northEast.x,
      this._box.northEast.y,
      this._box.width,
      this._box.height,
    );
    context.fill();
    context.stroke();
    context.restore();
  }
}
