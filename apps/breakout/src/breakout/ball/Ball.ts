import type { Asset } from '@apestaartje/animation/stage/Asset';
import type { Point } from '@apestaartje/geometry/point/Point';
import type { Rectangle } from '@apestaartje/geometry/rectangle/Rectangle';
import { add } from '@apestaartje/geometry/vector/add';
import { dotProduct } from '@apestaartje/geometry/vector/dotProduct';
import { scale } from '@apestaartje/geometry/vector/scale';
import type { Vector } from '@apestaartje/geometry/vector/Vector';

type BallOptions = {
  size: number;
  position: Point;
  velocity: Vector;
};

export class Ball implements Asset {
  private _velocity: Vector;
  private _position: Point;
  private _size: number;

  public get rectangle(): Rectangle {
    const halfSize = this._size / 2;

    return {
      topLeft: {
        x: this._position.x - halfSize,
        y: this._position.y + halfSize,
      },
      bottomRight: {
        x: this._position.x + halfSize,
        y: this._position.y - halfSize,
      },
    };
  }

  public get velocity(): Vector {
    return this._velocity;
  }

  public get position(): Vector {
    return this._position;
  }

  public get size(): number {
    return this._size;
  }

  constructor({ velocity, position, size }: BallOptions) {
    this._velocity = velocity;
    this._position = position;
    this._size = size;
  }

  public move(position: Point): void {
    this._position = position;
  }

  public reflect(normal: Vector): void {
    this._velocity = add(
      this._velocity,
      scale(normal, -2 * dotProduct(normal, this._velocity)),
    );
  }

  public cleanup(): boolean {
    return false;
  }

  public tick(): void {
    this._position = add(this._position, this.velocity);
  }

  public render(context: CanvasRenderingContext2D): void {
    const halfSize = this._size / 2;

    context.save();
    context.beginPath();
    context.fillStyle = '#ffffff';
    context.strokeStyle = '#ffffff';
    context.rect(
      this._position.x - halfSize,
      this._position.y - halfSize,
      this._size,
      this._size,
    );
    context.fill();
    context.stroke();
    context.restore();
  }
}
