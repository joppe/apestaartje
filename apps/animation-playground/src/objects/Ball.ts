import type { Chronometer } from '@apestaartje/animation/animator/Chronometer';
import type { Asset } from '@apestaartje/animation/stage/Asset';
import type { Rectangle } from '@apestaartje/geometry/rectangle/Rectangle';
import { type Vector } from '@apestaartje/geometry/vector/Vector';
import { distance } from '@apestaartje/geometry/vector/distance';

import { circle } from '../draw/shapes';

import { Movable } from './Movable';

type Appearance = {
  color: string;
  border?: {
    color: string;
    width: number;
  };
};

type BallProps = {
  position: Vector;
  velocity?: Vector;
  acceleration?: Vector;
  mass?: number;
  appearance: Appearance;
  edges: Rectangle;
};

export class Ball extends Movable implements Asset {
  private _radius: number;
  private _appearance: Appearance;
  private _edges: Rectangle;

  get radius(): number {
    return this._radius;
  }

  set appearance(appearance: Appearance) {
    this._appearance = appearance;
  }

  get position(): Vector {
    return this._position;
  }

  set position(position: Vector) {
    this._position = position;
  }

  set velocity(velocity: Vector) {
    this._velocity = velocity;
  }

  public constructor({
    position,
    velocity = { x: 0, y: 0 },
    acceleration = { x: 0, y: 0 },
    mass = 1,
    appearance,
    edges,
  }: BallProps) {
    super({ position, velocity, acceleration, mass });

    this._radius = mass * 5;
    this._appearance = appearance;
    this._edges = edges;
  }

  public cleanup(): boolean {
    return false;
  }

  public tick(_time: Chronometer): void {
    this.update();
    this.checkEdges();
  }

  public render(context: CanvasRenderingContext2D): void {
    circle(context, {
      radius: this._radius,
      position: this._position,
      color: this._appearance.color,
      border: this._appearance.border,
    });
  }

  public isPointInside(point: Vector): boolean {
    const delta = distance(point, this._position);

    return delta <= this._radius;
  }

  private checkEdges(): void {
    const bounce = -0.9; // Bounce factor to simulate energy loss on collision

    if (this._position.x + this._radius > this._edges.bottomRight.x) {
      this._position.x = this._edges.bottomRight.x - this._radius; // Reset position to edge
      this._velocity.x *= bounce; // Reverse horizontal speed
    }
    if (this._position.x - this._radius < this._edges.topLeft.x) {
      this._position.x = this._edges.topLeft.x + this._radius; // Reset position to edge
      this._velocity.x *= bounce; // Reverse horizontal speed
    }
    if (this._position.y + this._radius > this._edges.bottomRight.y) {
      this._position.y = this._edges.bottomRight.y - this._radius; // Reset position to edge
      this._velocity.y *= bounce; // Reverse vertical speed
    }
  }
}
