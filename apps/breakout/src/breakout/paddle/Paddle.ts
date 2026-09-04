import type { Asset } from '@apestaartje/animation/stage/Asset';
import type { Point } from '@apestaartje/geometry/point/Point';
import type { Rectangle } from '@apestaartje/geometry/rectangle/Rectangle';

import type { Box } from '../box/Box';

type PaddleOptions = {
  box: Box;
};

export class Paddle implements Asset {
  private readonly _box: Box;

  public get rectangle(): Rectangle {
    return this._box.rectangle;
  }

  constructor({ box }: PaddleOptions) {
    this._box = box;
  }

  public move(offset: Point): void {
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
    context.fillStyle = '#00ff00';
    context.strokeStyle = '#00ff00';
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
