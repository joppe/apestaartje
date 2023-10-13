import { GridPosition } from '@apestaartje/grid/grid/GridPosition';

export class Segment {
  private _position: GridPosition;

  public get position(): GridPosition {
    return this._position;
  }

  public set position(position: GridPosition) {
    this._position = position;
  }

  constructor(position: GridPosition) {
    this._position = position;
  }
}
