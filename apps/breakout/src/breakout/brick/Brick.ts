import type { Asset } from '@apestaartje/animation/stage/Asset';
import type { Rectangle } from '@apestaartje/geometry/rectangle/Rectangle';

import type { Box } from '../box/Box';

type BrickOptions = {
  box: Box;
};

export class Brick implements Asset {
  private readonly _box: Box;
  private _isHit = false;

  public get rectangle(): Rectangle {
    return this._box.rectangle;
  }

  public get isBouncable(): boolean {
    return this._isHit === false;
  }

  constructor({ box }: BrickOptions) {
    this._box = box;
  }

  public cleanup(): boolean {
    return this._isHit;
  }

  public hit(): void {
    this._isHit = true;
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
