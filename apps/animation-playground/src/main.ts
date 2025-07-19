import { Animator } from '@apestaartje/animation/animator/Animator';
import { Stage } from '@apestaartje/animation/stage/Stage';
import { add } from '@apestaartje/geometry/vector/add';
import { subtract } from '@apestaartje/geometry/vector/subtract';

import { Ball } from './objects/Ball';
import { Line } from './objects/Line';
import { Spring } from './objects/Spring';
import './style.css';
import { Mouse } from './util/Mouse';

const stageSize = { width: 800, height: 600 };

const stage = new Stage(stageSize);
const foreground = stage.createLayer('foreground', 10);
const mouse = new Mouse(stage.element);

const defaultBallAppearance = {
  color: '#a2a9c3',
  border: {
    color: 'black',
    width: 2,
  },
};
const ball = new Ball({
  position: { x: 400, y: 100 },
  appearance: defaultBallAppearance,
  edges: {
    topLeft: { x: 0, y: 0 },
    bottomRight: { x: stageSize.width, y: stageSize.height },
  },
  mass: 4,
});
const anchor = new Ball({
  position: { x: 400, y: 20 },
  appearance: {
    color: '#c3a2a9',
    border: {
      color: 'black',
      width: 2,
    },
  },
  edges: {
    topLeft: { x: 0, y: 0 },
    bottomRight: { x: stageSize.width, y: stageSize.height },
  },
  mass: 1,
});
const line = new Line({
  start: anchor.position,
  end: ball.position,
  color: 'black',
  width: 2,
});
const spring = new Spring({
  anchor: anchor.position,
  restLength: 100,
  maxLength: 200,
  k: 0.1,
});

const gravity = { x: 0, y: 2 }; // Simulated gravity force
const dragging = {
  active: false,
  offset: { x: 0, y: 0 },
};

foreground.addAsset(line, 'line', 10);
foreground.addAsset(anchor, 'anchor', 20);
foreground.addAsset(ball, 'ball', 30);

const animator = new Animator((chronometer) => {
  stage.tick(chronometer);

  ball.applyForce(gravity);

  if (
    !dragging.active &&
    mouse.isPressed &&
    ball.isPointInside(mouse.position)
  ) {
    dragging.active = true;
    dragging.offset = subtract(ball.position, mouse.position);
    ball.appearance = {
      ...defaultBallAppearance,
      color: '#a2c3b4',
    };
  } else if (!mouse.isPressed && dragging.active) {
    dragging.active = false;
    ball.appearance = defaultBallAppearance;
    ball.velocity = { x: 0, y: 0 };
  }

  if (dragging.active) {
    const tryPosition = add(mouse.position, dragging.offset);

    ball.position = spring.constraint(tryPosition);
  } else {
    const force = spring.calculateForce(ball.position);

    ball.applyForce(force);
  }

  line.end = ball.position;

  stage.render();

  return true;
});

document.body.append(stage.element);

animator.start();
