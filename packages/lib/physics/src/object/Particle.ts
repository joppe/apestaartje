import { Vector } from '@apestaartje/geometry/vector/Vector';

import { zero } from '../force/zero';

/**
 * A basic particle that can be used in calculations
 */

export class Particle {
  protected _charge: number;
  protected _mass: number;
  protected _position: Vector;
  protected _velocity: Vector;

  get position(): Vector {
    return this._position;
  }

  set position(position: Vector) {
    this._position = position;
  }

  get velocity(): Vector {
    return this._velocity;
  }

  set velocity(velocity: Vector) {
    this._velocity = velocity;
  }

  get mass(): number {
    return this._mass;
  }

  set mass(mass: number) {
    this._mass = mass;
  }

  get charge(): number {
    return this._charge;
  }

  constructor(mass = 1, charge = 0) {
    this._mass = mass;
    this._charge = charge;

    this._position = zero();
    this._velocity = zero();
  }
}
