import type { Asset } from '@apestaartje/animation/stage/Asset';
import type { Rectangle } from '@apestaartje/geometry/rectangle/Rectangle';
import type { Vector } from '@apestaartje/geometry/vector/Vector';
import { add } from '@apestaartje/geometry/vector/add';
import { angle } from '@apestaartje/geometry/vector/angle';
import { factory } from '@apestaartje/geometry/vector/factory';
import { setLength } from '@apestaartje/geometry/vector/setLength';
import { subtract } from '@apestaartje/geometry/vector/subtract';
import { random } from '@apestaartje/number/random';
import type { Range } from '@apestaartje/number/range/Range';

import { circle, line } from '../draw/shapes';

import { Movable } from './Movable';

type Appearance = {
  color: string;
  border: {
    color: string;
    width: number;
  };
};

type SelfSteeringVehicleProps = {
  position: Vector;
  size: number;
  appearance: Appearance;
  edges: Rectangle;
  maxSpeed: number;
  maxForce: number;
};

export class SelfSteeringVehicle extends Movable implements Asset {
  protected _size: number;
  protected _appearance: Appearance;
  protected _angle: number = Math.PI / 2;
  protected _edges: Rectangle;
  protected _maxSpeed: number;
  protected _maxForce: number;
  protected _circlePosition: Vector = { x: 0, y: 0 };
  protected _circleRadius: number = 25;
  protected _circleDistance: number = 80;
  protected _wanderRange: Range = { min: -0.3, max: 0.3 };
  protected _target: Vector = { x: 0, y: 0 };

  public constructor({
    position,
    size,
    appearance,
    edges,
    maxSpeed,
    maxForce,
  }: SelfSteeringVehicleProps) {
    super({
      position,
      velocity: { x: 0.1, y: 0 },
      acceleration: { x: 0, y: 0 },
      mass: 1,
      damping: 1,
    });

    this._size = size;
    this._appearance = appearance;
    this._edges = edges;
    this._maxSpeed = maxSpeed;
    this._maxForce = maxForce;
    this._angle = angle(this._velocity);
  }

  public cleanup(): boolean {
    return false;
  }

  /**
   * First update then wander, otherwise the position of the circle is not calculated with the correct position of the vehicle in mind
   */
  public tick(): void {
    this.update();
    this.wander();
    this.wrapEdges();
  }

  public render(ctx: CanvasRenderingContext2D): void {
    this.renderVehicle(ctx);

    circle(ctx, {
      radius: this._circleRadius,
      color: 'pink',
      position: this._circlePosition,
      border: {
        color: 'black',
        width: 1,
      },
    });

    line(ctx, {
      start: this._position,
      end: this._circlePosition,
      color: 'black',
      width: 1,
    });

    line(ctx, {
      start: this._circlePosition,
      end: this._target,
      color: 'black',
      width: 1,
    });
  }

  protected renderVehicle(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.translate(this._position.x, this._position.y);
    ctx.rotate(angle(this._velocity) + Math.PI / 2);
    ctx.beginPath();
    ctx.lineTo(0, -2 * this._size);
    ctx.lineTo(-this._size, 2 * this._size);
    ctx.lineTo(this._size, 2 * this._size);
    ctx.lineTo(0, -2 * this._size);
    ctx.closePath();
    ctx.fillStyle = this._appearance.color;
    ctx.strokeStyle = this._appearance.border.color;
    ctx.lineWidth = this._appearance.border.width;
    ctx.stroke();
    ctx.fill();
    ctx.restore();
  }

  protected wander(): void {
    this._circlePosition = add(
      this._position,
      setLength(this._velocity, this._circleDistance),
    );
    const theta = angle(this._velocity);

    this._angle += random(this._wanderRange.min, this._wanderRange.max);

    this._target = add(
      this._circlePosition,
      factory(this._angle + theta, this._circleRadius),
    );

    const desired = setLength(
      subtract(this._target, this._position),
      this._maxSpeed,
    );

    const steer = subtract(desired, this._velocity);

    this.applyForce(steer);
  }

  protected wrapEdges(): void {
    if (this._position.x < this._edges.topLeft.x - this._size) {
      this._position.x = this._edges.bottomRight.x + this._size;
    } else if (this._position.x > this._edges.bottomRight.x + this._size) {
      this._position.x = this._edges.topLeft.x - this._size;
    }

    if (this._position.y < this._edges.topLeft.y - this._size) {
      this._position.y = this._edges.bottomRight.y + this._size;
    } else if (this._position.y > this._edges.bottomRight.y + this._size) {
      this._position.y = this._edges.topLeft.y - this._size;
    }
  }
}
