import { Animator } from '@apestaartje/animation/animator/Animator';
import { type Asset } from '@apestaartje/animation/stage/Asset';
import { Stage } from '@apestaartje/animation/stage/Stage';
import { Rectangle } from '@apestaartje/geometry/rectangle/Rectangle';
import { type Vector } from '@apestaartje/geometry/vector/Vector';
import { add } from '@apestaartje/geometry/vector/add';
import { angle } from '@apestaartje/geometry/vector/angle';
import { factory } from '@apestaartje/geometry/vector/factory';
import { scale } from '@apestaartje/geometry/vector/scale';
import { subtract } from '@apestaartje/geometry/vector/subtract';
import { unit } from '@apestaartje/geometry/vector/unit';
import { rand } from '@apestaartje/number/rand';
import { random } from '@apestaartje/number/random';
import { type Range } from '@apestaartje/number/range/Range';

import { circle, line } from './draw/shapes';
import { Movable } from './objects/Movable';
import './style.css';
import { Mouse } from './util/Mouse';

const stageSize = { width: 800, height: 600 };

const stage = new Stage(stageSize);
const foreground = stage.createLayer('foreground', 10);

type Appearance = {
  color: string;
  border: {
    color: string;
    width: number;
  };
};

type VehicleProps = {
  position: Vector;
  size: number;
  appearance: Appearance;
  edges: Rectangle;
  maxSpeed: number;
  maxForce: number;
};

class Vehicle extends Movable implements Asset {
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
  }: VehicleProps) {
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
  }

  public cleanup(): boolean {
    return false;
  }

  public tick(): void {
    this.wander();
    this.update();
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
      scale(unit(this._velocity), this._circleDistance),
    );
    const theta = angle(this._velocity);

    this._angle += random(this._wanderRange.min, this._wanderRange.max);

    this._target = add(
      this._circlePosition,
      factory(this._angle + theta, this._circleRadius),
    );

    const desired = scale(
      unit(add(this._target, this._circlePosition)),
      this._maxSpeed,
    );
    const steer = subtract(desired, this._velocity);

    this.applyForce(steer);
  }

  protected wrapEdges(): void {
    if (this._position.x < this._edges.topLeft.x) {
      this._position.x = this._edges.bottomRight.x;
    } else if (this._position.x > this._edges.bottomRight.x) {
      this._position.x = this._edges.topLeft.x;
    }

    if (this._position.y < this._edges.topLeft.y) {
      this._position.y = this._edges.bottomRight.y;
    } else if (this._position.y > this._edges.bottomRight.y) {
      this._position.y = this._edges.topLeft.y;
    }
  }
}

const vehicle = new Vehicle({
  position: { x: stageSize.width / 2, y: stageSize.height / 2 },
  size: 10,
  appearance: {
    color: '#ff5733',
    border: {
      color: 'black',
      width: 2,
    },
  },
  edges: {
    topLeft: { x: 0, y: 0 },
    bottomRight: { x: stageSize.width, y: stageSize.height },
  },
  maxSpeed: 2,
  maxForce: 0.05,
});
foreground.addAsset(vehicle, 'vehicle', 10);

const animator = new Animator((chronometer) => {
  stage.tick(chronometer);

  stage.render();

  return true;
});

document.body.append(stage.element);

animator.start();
