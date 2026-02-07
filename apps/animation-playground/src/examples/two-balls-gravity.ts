import { Animator } from '@apestaartje/animation/animator/Animator';
import { Stage } from '@apestaartje/animation/stage/Stage';
import { scale } from '@apestaartje/geometry/vector/scale';

import { Ball } from '../objects/Ball';
import '../style.css';
import { Mouse } from '../util/Mouse';

const stageSize = { width: 800, height: 600 };

const c = 0.1; // Coefficient of friction
const stage = new Stage(stageSize);
const foreground = stage.createLayer('foreground', 10);
const mouse = new Mouse(stage.element);

const balls = [
  new Ball({
    position: { x: 400, y: 100 },
    appearance: {
      color: 'blue',
    },
    edges: {
      topLeft: { x: 0, y: 0 },
      bottomRight: { x: stageSize.width, y: stageSize.height },
    },
    mass: 10,
  }),
  new Ball({
    position: { x: 100, y: 100 },
    appearance: {
      color: 'red',
    },
    edges: {
      topLeft: { x: 0, y: 0 },
      bottomRight: { x: stageSize.width, y: stageSize.height },
    },
    mass: 1,
  }),
];

const gravity = { x: 0, y: 0.1 }; // Simulated gravity force

balls.forEach((ball, index) => {
  foreground.addAsset(ball, `ball-${index}`, 10 + index);
});

function ballOnFloor(ball: Ball): boolean {
  return ball.position.y + ball.radius + 1 >= stageSize.height;
}

const animator = new Animator((chronometer) => {
  stage.tick(chronometer);

  balls.forEach((ball) => {
    ball.applyForce(scale(gravity, ball.mass));

    if (mouse.isPressed) {
      const offset = ball.position.x - mouse.position.x > 0 ? -1 : 1;

      ball.applyForce({ x: -offset * 0.5, y: 0 });
    }

    if (ballOnFloor(ball)) {
      const friction = scale(ball.velocity, -c);

      ball.applyForce(friction);
    }
  });

  stage.render();

  return true;
});

document.body.append(stage.element);

animator.start();
