import { Point } from '@apestaartje/geometry/point/Point';
import { GridPosition } from '@apestaartje/grid/grid/GridPosition';

import { State } from '../status/Status';

import { rectangle } from './rectangle';
import { text } from './text';

export type RendererOptions = {
  blockSize: number;
  colors: {
    wall: string;
    candy: string;
    snake: string;
    text: string;
    background: string;
  };
};

export class Renderer {
  protected readonly _blockSize: number;
  protected readonly _colors: RendererOptions['colors'];

  constructor({ blockSize, colors }: RendererOptions) {
    this._blockSize = blockSize;
    this._colors = colors;
  }

  public status(
    position: GridPosition,
    state: State,
    context: CanvasRenderingContext2D,
  ): void {
    let text = '';

    if (state === State.IDLE) {
      text = 'Press space to start';
    } else if (state === State.GAME_OVER) {
      text = 'Game over';
    }

    this.text(position, text, 34, context);
  }

  public score(
    position: GridPosition,
    score: number,
    context: CanvasRenderingContext2D,
  ): void {
    this.text(position, `Score: ${score}`, 18, context);
  }

  public wall(position: GridPosition, context: CanvasRenderingContext2D): void {
    this.cell(position, this._colors.wall, context);
  }

  public candy(
    position: GridPosition,
    context: CanvasRenderingContext2D,
  ): void {
    this.cell(position, this._colors.candy, context);
  }

  public snake(
    position: GridPosition,
    context: CanvasRenderingContext2D,
  ): void {
    this.cell(position, this._colors.snake, context);
  }

  protected text(
    position: GridPosition,
    title: string,
    size: number,
    context: CanvasRenderingContext2D,
  ): void {
    const point: Point = {
      x: position.column * this._blockSize,
      y: position.row * this._blockSize,
    };

    text({
      position: point,
      color: this._colors.text,
      title,
      size,
      context,
    });
  }

  protected cell(
    position: GridPosition,
    color: string,
    context: CanvasRenderingContext2D,
  ): void {
    const point: Point = {
      x: position.column * this._blockSize,
      y: position.row * this._blockSize,
    };

    rectangle({
      position: point,
      size: {
        width: this._blockSize,
        height: this._blockSize,
      },
      color,
      background: this._colors.background,
      context,
    });
  }
}
