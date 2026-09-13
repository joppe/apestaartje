import type { Asset } from '@apestaartje/animation/stage/Asset';
import type { Point } from '@apestaartje/geometry/point/Point';

type GameOverOptions = {
  position: Point;
};

export class GameOver implements Asset {
  private readonly _position: Point;
  private _total = 0;
  private _hide = true;

  constructor({ position }: GameOverOptions) {
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
      "GAME OVER\nPress 'a' to start",
      this._position.x,
      this._position.y,
    );
    context.strokeStyle = '#ffffff';
    context.fill();
    context.stroke();
    context.restore();
  }
}
