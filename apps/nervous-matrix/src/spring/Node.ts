import { Vector } from '@apestaartje/geometry/vector/Vector';
import { add } from '@apestaartje/geometry/vector/add';
import { scale } from '@apestaartje/geometry/vector/scale';
import { subtract } from '@apestaartje/geometry/vector/subtract';
import { unit } from '@apestaartje/geometry/vector/unit';
import { add as addForce } from '@apestaartje/physics/force/add';
import { damping } from '@apestaartje/physics/force/spring/damping';
import { restoring } from '@apestaartje/physics/force/spring/restoring';
import { acceleration } from '@apestaartje/physics/move/acceleration';
import { position } from '@apestaartje/physics/move/position';
import { velocity } from '@apestaartje/physics/move/velocity';

import { NodeOptions } from './NodeOptions';

export class Node {
  private _acceleration: Vector = { x: 0, y: 0 };
  private _neighbours: Node[] = [];
  private _position: Vector;
  private _velocity: Vector = { x: 0, y: 0 };

  private readonly _mass: number;
  private readonly _c: number;
  private readonly _k: number;
  private readonly _springLength: number;

  get position(): Vector {
    return this._position;
  }

  public constructor(options: NodeOptions) {
    this._position = options.position;
    this._mass = options.mass;
    this._c = options.c;
    this._k = options.k;
    this._springLength = options.springLength;
  }

  public registerNeighbours(neighbours: Node[]): void {
    this._neighbours = neighbours;
  }

  public push(offset: Vector): void {
    this._velocity = add(this._velocity, offset);
  }

  public tick(dt: number): void {
    this._position = position(this._position, this._velocity, dt);

    const forces: Vector[] = this._neighbours.map((neighbour: Node): Vector => {
      const displacement: Vector = subtract(this._position, neighbour.position);
      const unt: Vector = unit(displacement);
      const inRest: Vector = scale(unt, this._springLength);
      const extension: Vector = subtract(displacement, inRest);

      return restoring(this._k, extension);
    });

    forces.push(damping(this._c, this._velocity));

    const force: Vector = addForce(...forces);

    // acceleration
    this._acceleration = acceleration(force, this._mass);

    // velocity
    this._velocity = velocity(this._velocity, this._acceleration, dt);
  }
}
