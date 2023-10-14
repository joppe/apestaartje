import { Asset } from '@apestaartje/animation/stage/Asset';
import { GridPosition } from '@apestaartje/grid/grid/GridPosition';

import { Renderer } from '../render/Renderer';

export type ScoreOptions = {
  renderer: Renderer;
  position: GridPosition;
};

export class Score implements Asset {
  private readonly _renderer: Renderer;
  private readonly _position: GridPosition;
  private _score: number;

  constructor({ renderer, position }: ScoreOptions) {
    this._position = position;
    this._renderer = renderer;
    this._score = 0;
  }

  public reset(): void {
    this._score = 0;
  }

  public increase(): void {
    this._score += 1;
  }

  public cleanup(): boolean {
    return false;
  }

  public tick(): void {
    // Nothing to calculate
  }

  public render(context: CanvasRenderingContext2D): void {
    this._renderer.score(this._position, this._score, context);
  }
}
