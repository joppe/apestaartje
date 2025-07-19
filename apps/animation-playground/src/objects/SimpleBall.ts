import type { Chronometer } from '@apestaartje/animation/animator/Chronometer';
import type { Asset } from '@apestaartje/animation/stage/Asset';
import type { Vector } from '@apestaartje/geometry/vector/Vector';

import { circle } from '../draw/shapes';

type SimpleBallProps = {
  position: Vector;
  velocity?: Vector;
  radius: number;
  color: string;
};

export class SimpleBall implements Asset {
  private _position: Vector;
  private _velocity: Vector;
  private _radius: number;
  private _color: string;

  get position(): Vector {
    return this._position;
  }

  get radius(): number {
    return this._radius;
  }

  get velocity(): Vector {
    return this._velocity;
  }

  set velocity(value: Vector) {
    this._velocity = value;
  }

  constructor({
    position,
    velocity: speed = { x: 0, y: 0 },
    radius,
    color,
  }: SimpleBallProps) {
    this._position = position;
    this._velocity = speed;
    this._radius = radius;
    this._color = color;
  }

  cleanup(): boolean {
    return false;
  }

  tick(_time: Chronometer): void {
    this._position.x += this._velocity.x;
    this._position.y += this._velocity.y;
  }

  render(context: CanvasRenderingContext2D): void {
    circle(context, {
      radius: this._radius,
      position: this._position,
      color: this._color,
    });
  }
}
