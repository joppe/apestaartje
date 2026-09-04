import { Animator } from '@apestaartje/animation/animator/Animator';
import type { Chronometer } from '@apestaartje/animation/animator/Chronometer';
import { Stage } from '@apestaartje/animation/stage/Stage';

import { Ball } from './breakout/ball/Ball';
import { factory as brickFactory } from './breakout/brick/factory';
import { detectCollision } from './breakout/collision/detect';
import { factory as wallFactory } from './breakout/wall/factory';

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
  const stage = new Stage({
    width,
    height,
  });
  const background = stage.createLayer('background', 10);
  const foreground = stage.createLayer('foreground', 100);

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
  foreground.addAsset(ball, 'ball', 100);

  walls.forEach((wall, index) => {
    background.addAsset(wall, `wall-${index}`, 10);
  });

  bricks.forEach((brick, index) => {
    foreground.addAsset(brick, `brick-${index}`, 10);
  });

  stage.render();

  const animator = new Animator((time: Chronometer): boolean => {
    stage.tick(time);

    for (const wall of walls) {
      const bounced = detectCollision(ball, wall.rectangle);

      if (bounced !== null) {
        ball.reflect(bounced.normal);
        ball.move(bounced.point);
        break;
      }
    }

    for (const brick of bricks) {
      const bounced = detectCollision(ball, brick.rectangle);

      if (bounced !== null) {
        ball.reflect(bounced.normal);
        ball.move(bounced.point);
        break;
      }
    }

    stage.render();

    return true;
  });

  animator.start();

  stage.element.style.backgroundColor = '#000000';
  container.appendChild(stage.element);
}
