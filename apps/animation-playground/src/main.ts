import { Animator } from '@apestaartje/animation/animator/Animator';
import { Stage } from '@apestaartje/animation/stage/Stage';
import type { Vector } from '@apestaartje/geometry/vector/Vector';
import { add } from '@apestaartje/geometry/vector/add';
import { subtract } from '@apestaartje/geometry/vector/subtract';

import { Ball } from './objects/Ball';
import { Line } from './objects/Line';
import './style.css';
import { Mouse } from './util/Mouse';

const stageSize = { width: 800, height: 600 };
const count = 10;
const stage = new Stage(stageSize);
const foreground = stage.createLayer('foreground', 10);
const mouse = new Mouse(stage.element);

const defaultAppearance = {
  color: '#a2a9c3',
  border: {
    color: 'black',
    width: 1,
  },
};
type State = {
  active: Ball | null;
  offset: Vector;
};

const state: State = {
  active: null,
  offset: { x: 0, y: 0 },
};

const circles = Array.from({ length: count }, (_, i) => {
  const circle = new Ball({
    position: { x: 400, y: 10 + i * 50 },
    appearance: defaultAppearance,
    edges: {
      topLeft: { x: 0, y: 0 },
      bottomRight: { x: stageSize.width, y: stageSize.height },
    },
  });

  foreground.addAsset(circle, `circle-${i}`, 10);

  return circle;
});
Array.from({ length: count - 1 }, (_, i) => {
  const line = new Line({
    start: {
      get x() {
        return circles[i].position.x;
      },
      get y() {
        return circles[i].position.y;
      },
    },
    end: {
      get x() {
        return circles[i + 1].position.x;
      },
      get y() {
        return circles[i + 1].position.y;
      },
    },
    color: 'black',
    width: 1,
  });

  foreground.addAsset(line, `line-${i}`, 5);

  return line;
});

const animator = new Animator((chronometer) => {
  stage.tick(chronometer);

  if (state.active === null && mouse.isPressed) {
    // find circle under mouse
    const circle = circles.find((c) => c.isPointInside(mouse.position));

    if (circle) {
      state.active = circle;
      state.offset = subtract(circle.position, mouse.position);

      circle.appearance = {
        ...defaultAppearance,
        color: '#a2c3b4',
      };
    }
  } else if (!mouse.isPressed && state.active) {
    state.active.appearance = defaultAppearance;
    state.active = null;
  }

  if (state.active) {
    const tryPosition = add(mouse.position, state.offset);

    state.active.position = tryPosition;
  }

  stage.render();

  return true;
});

document.body.append(stage.element);

animator.start();
