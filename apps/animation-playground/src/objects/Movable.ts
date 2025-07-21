import type { Vector } from '@apestaartje/geometry/vector/Vector';
import { add } from '@apestaartje/geometry/vector/add';
import { scale } from '@apestaartje/geometry/vector/scale';

export type MovableProps = {
  position: Vector;
  velocity: Vector;
  acceleration: Vector;
  mass: number;
  damping?: number;
};

export class Movable {
  protected _position: Vector;
  protected _velocity: Vector;
  protected _acceleration: Vector;
  protected _mass: number;
  protected _damping: number;

  get position(): Vector {
    return this._position;
  }

  get velocity(): Vector {
    return this._velocity;
  }

  get acceleration(): Vector {
    return this._acceleration;
  }

  get mass(): number {
    return this._mass;
  }

  protected constructor({
    position,
    velocity,
    acceleration,
    mass,
    damping = 0.98,
  }: MovableProps) {
    this._position = position;
    this._velocity = velocity;
    this._acceleration = acceleration;
    this._mass = mass;
    this._damping = damping;
  }

  public applyForce(force: Vector): void {
    // F = m * a => a = F / m
    this._acceleration = add(this._acceleration, scale(force, 1 / this._mass));
  }

  protected update(): void {
    this._velocity = add(this._velocity, this._acceleration);
    this._velocity = scale(this._velocity, this._damping);
    this._position = add(this._position, this._velocity);
    // Reset acceleration after applying it
    this._acceleration = scale(this._acceleration, 0);
  }
}
