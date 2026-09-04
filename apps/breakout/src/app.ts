import { Animator } from '@apestaartje/animation/animator/Animator';
import type { Chronometer } from '@apestaartje/animation/animator/Chronometer';
import { Stage } from '@apestaartje/animation/stage/Stage';

import type { Action } from './control/Action';

import { Ball } from './breakout/ball/Ball';
import { Box } from './breakout/box/Box';
import { factory as brickFactory } from './breakout/brick/factory';
import {
  type BounceImpact,
  detectCollision,
} from './breakout/collision/detect';
import { Paddle } from './breakout/paddle/Paddle';
import { factory as wallFactory } from './breakout/wall/factory';
import { keyboard } from './control/keyboard';

type AppOptions = {
  width: number;
  height: number;
  wallOffset: number;
  wallSize: number;
  container: HTMLElement;
};

export function app({
  container,
  width,
  height,
  wallOffset,
  wallSize,
}: AppOptions) {
  const control = keyboard();
  const stage = new Stage({
    width,
    height,
  });
  const background = stage.createLayer('background', 10);
  const foreground = stage.createLayer('foreground', 100);

  const paddle = new Paddle({
    box: new Box({
      northEast: {
        x: 400,
        y: height - (wallOffset + wallSize),
      },
      size: {
        width: 200,
        height: wallSize,
      },
    }),
  });
  const walls = wallFactory({
    stage: { width, height },
    offset: wallOffset,
    size: wallSize,
  });
  const ball = new Ball({
    velocity: { x: 2, y: 3 },
    position: { x: 510, y: 405 },
    size: 10,
  });
  const bricks = brickFactory({
    columns: 10,
    rows: 8,
    size: {
      width: 60,
      height: 15,
    },
    northEast: {
      x: 2 * wallOffset + wallSize + 20,
      y: 2 * wallOffset + wallSize + 20,
    },
    gap: 10,
  });

  background.freeze(true);
  foreground.addAsset(ball, 'ball', 2000);
  foreground.addAsset(paddle, 'paddle', 1000);

  walls.forEach((wall, index) => {
    background.addAsset(wall, `wall-${index}`, 100 + index);
  });

  bricks.forEach((brick, index) => {
    foreground.addAsset(brick, `brick-${index}`, 200 + index);
  });

  stage.render();

  const animator = new Animator((time: Chronometer): boolean => {
    let bounced: BounceImpact | null = null;

    stage.tick(time);

    if (paddle) {
      bounced = detectCollision(ball, paddle.rectangle);

      if (bounced !== null) {
        ball.reflect(bounced.normal);
        ball.move(bounced.point);
      }
    }

    if (bounced === null) {
      for (const wall of walls) {
        bounced = detectCollision(ball, wall.rectangle);

        if (bounced !== null) {
          ball.reflect(bounced.normal);
          ball.move(bounced.point);
          break;
        }
      }
    }

    if (bounced === null) {
      for (const brick of bricks) {
        if (!brick.isBouncable) {
          continue;
        }

        const bounced = detectCollision(ball, brick.rectangle);

        if (bounced !== null) {
          ball.reflect(bounced.normal);
          ball.move(bounced.point);
          brick.hit();
          break;
        }
      }
    }

    stage.render();

    return true;
  });

  control.subscribe({
    next: (action: Action): void => {
      switch (action) {
        case 'left':
          paddle.move({ x: -10, y: 0 });
          break;
        case 'right':
          paddle.move({ x: 10, y: 0 });
          break;
      }
    },
  });
  animator.start();

  stage.element.style.backgroundColor = '#000000';
  container.appendChild(stage.element);
}
