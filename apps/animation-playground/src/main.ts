import { Animator } from '@apestaartje/animation/animator/Animator';
import type { Chronometer } from '@apestaartje/animation/animator/Chronometer';
import type { Asset } from '@apestaartje/animation/stage/Asset';
import { Stage } from '@apestaartje/animation/stage/Stage';
import type { Point } from '@apestaartje/geometry/point/Point';
import type { Vector } from '@apestaartje/geometry/vector/Vector';

import { circle, line } from './shapes';
import './style.css';

const stageSize = { width: 800, height: 600 };

type BallProps = {
  position: Vector;
  velocity?: Vector;
  radius: number;
  color: string;
};

class Ball implements Asset {
  private _position: Vector;
  private _velocity: Vector;
  private _radius: number;
  private _color: string;

  get position(): Vector {
    return this._position;
  }

  get radius(): number {
    return this._radius;
  }

  get velocity(): Vector {
    return this._velocity;
  }

  set velocity(value: Vector) {
    this._velocity = value;
  }

  constructor({
    position,
    velocity: speed = { x: 0, y: 0 },
    radius,
    color,
  }: BallProps) {
    this._position = position;
    this._velocity = speed;
    this._radius = radius;
    this._color = color;
  }

  cleanup(): boolean {
    return false;
  }

  tick(_time: Chronometer): void {
    this._position.x += this._velocity.x;
    this._position.y += this._velocity.y;
  }

  render(context: CanvasRenderingContext2D): void {
    circle(context, {
      radius: this._radius,
      position: this._position,
      color: this._color,
    });
  }
}

type LineProps = {
  start: Vector;
  end: Vector;
  color: string;
  width: number;
};

class Line implements Asset {
  private _start: Vector;
  private _end: Vector;
  private _color: string;
  private _width: number;

  set end(value: Vector) {
    this._end = value;
  }

  constructor({ start, end, color, width }: LineProps) {
    this._start = start;
    this._end = end;
    this._color = color;
    this._width = width;
  }

  cleanup(): boolean {
    return false;
  }

  tick(_time: Chronometer): void {
    // No dynamic behavior for the line
  }

  render(context: CanvasRenderingContext2D): void {
    line(context, {
      start: this._start,
      end: this._end,
      color: this._color,
      width: this._width,
    });
  }
}

class Mouse {
  private _position: Point;

  get position(): Point {
    return this._position;
  }

  constructor(element: HTMLElement) {
    this._position = { x: 0, y: 0 };

    this.attachListeners(element);
  }

  private attachListeners(element: HTMLElement): void {
    const rect = element.getBoundingClientRect();

    const handle = (event: MouseEvent): void => {
      this._position.x = event.clientX - rect.left;
      this._position.y = event.clientY - rect.top;
    };

    element.addEventListener('mousemove', handle);
    element.addEventListener('mouseenter', handle);
  }
}

const stage = new Stage(stageSize);
const foreground = stage.createLayer('foreground', 10);
const mouse = new Mouse(stage.element);

const lineToMouse = new Line({
  start: { x: 0, y: 0 },
  end: { x: 100, y: 100 },
  color: 'red',
  width: 20,
});

const ball = new Ball({
  position: { x: 100, y: 100 },
  velocity: { x: 2.5, y: 2 },
  radius: 20,
  color: 'red',
});

foreground.addAsset(ball, 'ball', 10);
foreground.addAsset(lineToMouse, 'lineToMouse', 20);

const animator = new Animator((chronometer) => {
  stage.tick(chronometer);

  lineToMouse.end = mouse.position;

  if (
    ball.position.x + ball.radius > stageSize.width ||
    ball.position.x - ball.radius < 0
  ) {
    ball.velocity.x *= -1; // Reverse horizontal speed
  }
  if (
    ball.position.y + ball.radius > stageSize.height ||
    ball.position.y - ball.radius < 0
  ) {
    ball.velocity.y *= -1; // Reverse vertical speed
  }

  stage.render();

  return true;
});

document.body.append(stage.element);

animator.start();
