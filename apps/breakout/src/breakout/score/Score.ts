import type { Asset } from '@apestaartje/animation/stage/Asset';
import type { Point } from '@apestaartje/geometry/point/Point';

type ScoreOptions = {
  position: Point;
};

export class Score implements Asset {
  private readonly _position: Point;
  private _total = 0;

  constructor({ position }: ScoreOptions) {
    this._position = position;
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
    context.save();
    context.beginPath();
    context.fillStyle = '#ffffff';
    context.font = '18px serif';
    context.fillText(
      `Score: ${this._total}`,
      this._position.x,
      this._position.y,
    );
    context.strokeStyle = '#ffffff';
    context.fill();
    context.stroke();
    context.restore();
  }
}
