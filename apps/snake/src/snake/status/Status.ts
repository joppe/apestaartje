import type { Asset } from '@apestaartje/animation/stage/Asset';
import type { GridPosition } from '@apestaartje/grid/grid/GridPosition';

import type { Renderer } from '../render/Renderer';

export type StatusOptions = {
  renderer: Renderer;
  position: GridPosition;
};

export enum State {
  IDLE,
  RUNNING,
  GAME_OVER,
}

export class Status implements Asset {
  private readonly _renderer: Renderer;
  private readonly _position: GridPosition;
  private _state: State = State.IDLE;

  public get state(): State {
    return this._state;
  }

  public set state(state: State) {
    this._state = state;
  }

  constructor({ renderer, position }: StatusOptions) {
    this._renderer = renderer;
    this._position = position;
  }

  public cleanup(): boolean {
    return false;
  }

  public tick(): void {
    // Nothing to do here
  }

  public render(context: CanvasRenderingContext2D): void {
    this._renderer.status(this._position, this._state, context);
  }
}
