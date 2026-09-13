import type { Asset } from '@apestaartje/animation/stage/Asset';
import type { Point } from '@apestaartje/geometry/point/Point';

type StartOptions = {
  position: Point;
};

export class Start implements Asset {
  private readonly _position: Point;
  private _total = 0;
  private _hide = false;

  constructor({ position }: StartOptions) {
    this._position = position;
  }

  public hide(): void {
    this._hide = true;
  }

  public show(): void {
    this._hide = false;
  }

  public update(points: number) {
    this._total += points;
  }

  public cleanup(): boolean {
    return false;
  }

  public tick(): void {
    // nothing
  }

  public render(context: CanvasRenderingContext2D): void {
    if (this._hide) {
      return;
    }

    context.save();
    context.beginPath();
    context.fillStyle = '#ffffff';
    context.font = '18px serif';
    context.fillText(
      'Press SPACE to start',
      this._position.x,
      this._position.y,
    );
    context.strokeStyle = '#ffffff';
    context.fill();
    context.stroke();
    context.restore();
  }
}
