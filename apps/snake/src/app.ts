import { Animator } from '@apestaartje/animation/animator/Animator';
import type { Chronometer } from '@apestaartje/animation/animator/Chronometer';
import { Stage } from '@apestaartje/animation/stage/Stage';

import { keyboard } from './snake/controls/keyboard';
import { fromTemplate } from './snake/generate/fromTemplate';
import { isSamePosition } from './snake/map/isSamePosition';
import { Direction } from './snake/move/Direction';
import { Renderer } from './snake/render/Renderer';
import { Score } from './snake/score/Score';
import { State, Status } from './snake/status/Status';
import { Reset } from './snake/status/reset';

/**
 * The snake game
 *
 * The game consists of a map (walls), a snake and food.
 * The snake moves around the map and eats food.
 * The snake grows when it eats food.
 * The game is over when the snake hits a wall or itself.
 *
 * The game is generated by using a template. Them map is rendered in a separate layer, because it does not change.
 */

export type AppOptions = {
  template: string;
  wallChar: string;
  snakeChar: string;
  foodChar: string;
  blockSize: number;
  colors: {
    wall: string;
    snake: string;
    candy: string;
    text: string;
    background: string;
  };
  container: HTMLElement;
};

export function app({
  template,
  wallChar,
  snakeChar,
  foodChar,
  blockSize,
  colors,
  container,
}: AppOptions): void {
  const renderer = new Renderer({
    blockSize,
    colors,
  });
  const { map, snake, candy } = fromTemplate({
    renderer,
    template,
    wallChar,
    snakeChar,
    foodChar,
  });

  if (snake === undefined || candy === undefined) {
    throw new Error('Could not find all elements in the template');
  }

  const status = new Status({
    renderer,
    position: { row: Math.floor(map.rows / 2) + 5, column: 15 },
  });
  const score = new Score({
    renderer,
    position: { row: map.rows + 1, column: 0 },
  });
  const reset = new Reset({ snake, candy });
  const stage = new Stage({
    width: blockSize * map.columns,
    height: blockSize * (map.rows + 2),
  });

  const background = stage.createLayer('background', 10);
  const foreground = stage.createLayer('foreground', 20);

  background.freeze(true);
  background.addAsset(map, 'map', 10);

  foreground.addAsset(candy, 'candy', 10);
  foreground.addAsset(snake, 'snake', 20);
  foreground.addAsset(score, 'score', 30);
  foreground.addAsset(status, 'status', 40);

  keyboard({
    Space: (): void => {
      if (status.state === State.IDLE) {
        status.state = State.RUNNING;
      }
    },
    ArrowUp: (): void => {
      snake.direction = Direction.Up;
    },
    ArrowRight: (): void => {
      snake.direction = Direction.Right;
    },
    ArrowDown: (): void => {
      snake.direction = Direction.Down;
    },
    ArrowLeft: (): void => {
      snake.direction = Direction.Left;
    },
    KeyQ: (): void => {
      if (status.state === State.GAME_OVER) {
        reset.reset();
        score.reset();

        status.state = State.RUNNING;
      }
    },
  });

  const animator = new Animator((time: Chronometer): boolean => {
    if (status.state === State.RUNNING) {
      stage.tick(time);

      // Check if eating itself
      if (snake.isEatingItSelf()) {
        status.state = State.GAME_OVER;
      }

      // Check colission with wall
      if (map.isWall(snake.position)) {
        status.state = State.GAME_OVER;
      }

      // Check if eating candy
      if (isSamePosition(snake.position, candy.position)) {
        snake.grow(3);
        candy.reSpawn(map.randomFreePosition());
        score.increase();
      }
    }

    stage.render();

    return true;
  });

  stage.element.style.backgroundColor = colors.background;
  container.appendChild(stage.element);

  animator.start();
}
