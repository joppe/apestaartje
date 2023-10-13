import { Chronometer } from '@apestaartje/animation/animator/Chronometer';
import { Asset } from '@apestaartje/animation/stage/Asset';
import { GridPosition } from '@apestaartje/grid/grid/GridPosition';

import { Renderer } from '../render/Renderer';

export type CandyOptions = {
  renderer: Renderer;
  position: GridPosition;
};

export class Candy implements Asset {
  private readonly _renderer: Renderer;
  private _position: GridPosition;

  public get position(): GridPosition {
    return this._position;
  }

  constructor({ renderer, position }: CandyOptions) {
    this._renderer = renderer;
    this._position = position;
  }

  public reSpawn(position: GridPosition): void {
    this._position = position;
  }

  public cleanup(): boolean {
    return false;
  }

  public tick(_time: Chronometer): void {
    // Nothing to calculate
  }

  public render(context: CanvasRenderingContext2D): void {
    this._renderer.candy(this._position, context);
  }
}
