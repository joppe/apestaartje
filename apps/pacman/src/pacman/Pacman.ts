import { Vector } from '@apestaartje/geometry/vector/Vector';
import { add } from '@apestaartje/geometry/vector/add';

type PacmonOptions = {
  position: Vector;
  direction: Vector;
};

export class Pacman {
  private _position: Vector = { x: 0, y: 0 };
  private _oldPosition: Vector = { x: 0, y: 0 };
  private _direction: Vector;

  get position(): Vector {
    return this._position;
  }

  get direction(): Vector {
    return this._direction;
  }

  set direction(direction: Vector) {
    this._direction = direction;
  }

  public constructor({ position, direction }: PacmonOptions) {
    this._position = position;
    this._direction = direction;
  }

  public move(): void {
    this._oldPosition = this._position;
    this._position = add(this._position, this._direction);
  }

  public revert(): void {
    this._position = this._oldPosition;
  }
}
