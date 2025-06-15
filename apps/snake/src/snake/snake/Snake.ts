import type { Chronometer } from '@apestaartje/animation/animator/Chronometer';
import type { Asset } from '@apestaartje/animation/stage/Asset';
import { Timer } from '@apestaartje/animation/timer/Timer';
import type { GridPosition } from '@apestaartje/grid/grid/GridPosition';

import { isSamePosition } from '../map/isSamePosition';
import { Direction } from '../move/Direction';
import { move } from '../move/move';
import { opposite } from '../move/opposite';
import type { Renderer } from '../render/Renderer';

import { Segment } from './Segment';

export type SnakeOptions = {
  renderer: Renderer;
  position: GridPosition;
  size: number;
  direction: Direction;
};

export class Snake implements Asset {
  private readonly _renderer: Renderer;
  private _position: GridPosition = { row: 0, column: 0 };
  private _segments: Segment[] = [];
  private _direction: Direction = Direction.Right;
  private _timer: Timer;

  public set direction(direction: Direction) {
    this._direction = direction;
  }

  public get direction(): Direction {
    return this._direction;
  }

  public get position(): GridPosition {
    return this._position;
  }

  public get size(): number {
    return this._segments.length;
  }

  constructor({ renderer, position, size, direction }: SnakeOptions) {
    this._renderer = renderer;
    this._timer = new Timer(100);

    this.init(position, size, direction);
  }

  public reset(
    position: GridPosition,
    size: number,
    direction: Direction,
  ): void {
    this.init(position, size, direction);
  }

  public grow(size = 1): void {
    const lastSegment = this._segments[this._segments.length - 1];
    const position = lastSegment.position;

    Array.from({ length: size }, (): void => {
      this._segments.push(new Segment(position));
    });
  }

  public isEatingItSelf(): boolean {
    return this._segments.slice(1).some((segment: Segment): boolean => {
      return isSamePosition(segment.position, this._position);
    });
  }

  public cleanup(): boolean {
    return false;
  }

  public tick(time: Chronometer): void {
    this._timer.update(time.offset);

    if (this._timer.isReady) {
      this.move();
      this._timer.reset();
    }
  }

  public render(context: CanvasRenderingContext2D): void {
    this._segments.forEach((segment: Segment): void => {
      this._renderer.snake(segment.position, context);
    });
  }

  private move(): void {
    let position = move(this._position, this._direction);
    this._position = position;

    this._segments.forEach((segment: Segment): void => {
      const nextPosition = segment.position;

      segment.position = position;
      position = nextPosition;
    });
  }

  private init(
    position: GridPosition,
    size: number,
    direction: Direction,
  ): void {
    this._position = position;
    this._direction = direction;

    const segmentDirection = opposite(direction);

    this._segments = Array.from(
      { length: size },
      (_: unknown, index: number): Segment => {
        return new Segment(move(position, segmentDirection, index));
      },
    );
  }
}
