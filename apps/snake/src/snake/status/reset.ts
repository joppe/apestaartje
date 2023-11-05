import { GridPosition } from '@apestaartje/grid/grid/GridPosition';

import { Candy } from '../candy/Candy';
import { Direction } from '../move/Direction';
import { Snake } from '../snake/Snake';

export type ResetOptions = {
  snake: Snake;
  candy: Candy;
};

export class Reset {
  private readonly _snake: Snake;
  private readonly _snakePosition: GridPosition;
  private readonly _snakeDirection: Direction;
  private readonly _snakeSize: number;
  private readonly _candy: Candy;
  private readonly _candyPosition: GridPosition;

  constructor({ snake, candy }: ResetOptions) {
    this._snake = snake;
    this._snakePosition = snake.position;
    this._snakeDirection = snake.direction;
    this._snakeSize = snake.size;
    this._candy = candy;
    this._candyPosition = candy.position;
  }

  public reset(): void {
    this._snake.reset(
      this._snakePosition,
      this._snakeSize,
      this._snakeDirection,
    );
    this._candy.reSpawn(this._candyPosition);
  }
}
