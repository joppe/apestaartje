import type { Asset } from '@apestaartje/animation/stage/Asset';
import type { Rectangle } from '@apestaartje/geometry/rectangle/Rectangle';

import type { Box } from '../box/Box';

type BrickOptions = {
  box: Box;
  level: number;
};

const COLORS = [
  '#ffffff',
  '#0174d7',
  '#2fcc3e',
  '#fbdd01',
  '#ff841a',
  '#fc4132',
] as const;

export class Brick implements Asset {
  private readonly _box: Box;
  private readonly _level: number;
  private _isHit = false;

  public get rectangle(): Rectangle {
    return this._box.rectangle;
  }

  public get level(): number {
    return this._level;
  }

  public get isBouncable(): boolean {
    return this._isHit === false;
  }

  constructor({ box, level }: BrickOptions) {
    this._box = box;
    this._level = level;
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
    const color = COLORS[this._level] ?? COLORS[0];

    context.save();
    context.beginPath();
    context.fillStyle = color;
    context.strokeStyle = color;
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
