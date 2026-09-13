import { Animator } from '@apestaartje/animation/animator/Animator';
import type { Chronometer } from '@apestaartje/animation/animator/Chronometer';
import type { Layer } from '@apestaartje/animation/stage/Layer';
import type { Stage } from '@apestaartje/animation/stage/Stage';
import type { Observable } from '@apestaartje/observable/observable/Observable';
import { Subject } from '@apestaartje/observable/subject/Subject';

import type { Brick } from '../brick/Brick';
import type { Wall } from '../wall/Wall';
import type { Action } from './control/Action';
import type { Control } from './control/Control';

import { Ball } from '../ball/Ball';
import { Box } from '../box/Box';
import { factory as brickFactory } from '../brick/factory';
import { type BounceImpact, detectCollision } from '../collision/detect';
import { Paddle } from '../paddle/Paddle';
import { factory as wallFactory } from '../wall/factory';
import { keyboard } from './control/keyboard';

type GameOptions = {
  stage: Stage;
  width: number;
  height: number;
  wallOffset: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  wallSize: number;
};

export class Game {
  private readonly _score: Subject<number>;
  private readonly _gameOver: Subject<boolean>;
  private readonly _stage: Stage;
  private readonly _layer: Layer;
  private readonly _width: number;
  private readonly _height: number;
  private readonly _wallOffset: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  private readonly _wallSize: number;
  private _controls: Control | undefined;
  private _ball: Ball | undefined;
  private _paddle: Paddle | undefined;
  private _walls: Wall[] | undefined;
  private _bricks: Brick[] | undefined;
  private _animator: Animator | undefined;

  public get score(): Observable<number> {
    return this._score.asObservable();
  }

  public get gameOver(): Observable<boolean> {
    return this._gameOver.asObservable();
  }

  constructor({ stage, width, height, wallOffset, wallSize }: GameOptions) {
    this._score = new Subject();
    this._gameOver = new Subject();

    this._stage = stage;
    this._layer = stage.createLayer('foreground', 100);
    this._width = width;
    this._height = height;
    this._wallOffset = wallOffset;
    this._wallSize = wallSize;

    this.reset();
  }

  reset() {
    this._layer.removeAllAssets();

    this._paddle = new Paddle({
      box: new Box({
        northEast: {
          x: this._width / 2 - 60,
          y: this._height - (this._wallOffset.top + this._wallSize),
        },
        size: {
          width: 120,
          height: this._wallSize,
        },
      }),
      width: this._width,
    });
    this._walls = wallFactory({
      stage: { width: this._width, height: this._height },
      offset: this._wallOffset,
      size: this._wallSize,
    });
    this._ball = new Ball({
      velocity: { x: 2, y: 3 },
      position: { x: 310, y: 405 },
      size: 10,
    });
    this._bricks = brickFactory({
      columns: 10,
      rows: 5,
      size: {
        width: 60,
        height: 15,
      },
      northEast: {
        x: 2 * this._wallOffset.left + this._wallSize + 20,
        y: 2 * this._wallOffset.bottom + this._wallSize + 20,
      },
      gap: 10,
    });
    this._animator = new Animator((time: Chronometer): boolean => {
      this._stage.tick(time);
      this.tick();

      this._stage.render();

      return true;
    });

    this._layer.addAsset(this._ball, 'ball', 2000);
    this._layer.addAsset(this._paddle, 'paddle', 1000);
    //this._layer.addAsset(this._score, 'score', 4000);

    this._walls.forEach((wall, index) => {
      this._layer.addAsset(wall, `wall-${index}`, 100 + index);
    });

    this._bricks.forEach((brick, index) => {
      this._layer.addAsset(brick, `brick-${index}`, 200 + index);
    });
  }

  public tick(): void {
    if (
      this._ball === undefined ||
      this._paddle === undefined ||
      this._walls === undefined ||
      this._bricks === undefined
    ) {
      throw new Error('Unable to render game, all assets are undefined');
    }

    let bounced: BounceImpact | null = detectCollision(
      this._ball,
      this._paddle.rectangle,
    );

    if (bounced === null) {
      for (const wall of this._walls) {
        bounced = detectCollision(this._ball, wall.rectangle);

        if (bounced !== null) {
          break;
        }
      }
    }

    if (bounced === null) {
      for (const brick of this._bricks) {
        if (!brick.isBouncable) {
          continue;
        }

        bounced = detectCollision(this._ball, brick.rectangle);

        if (bounced !== null) {
          brick.hit();
          this._score.next(10 + 10 * brick.level);
          break;
        }
      }
    }

    if (bounced !== null) {
      this._ball.reflect(bounced.normal);
      this._ball.move(bounced.point);
    }

    if (this._ball.position.y > this._height) {
      this._gameOver.next(true);
    }
  }

  public start(): void {
    this.reset();

    this._controls = keyboard();
    this._controls.subscribe({
      next: (action: Action): void => {
        switch (action) {
          case 'left':
            this._paddle?.move({ x: -10, y: 0 });
            break;
          case 'right':
            this._paddle?.move({ x: 10, y: 0 });
            break;
        }
      },
    });

    this._animator?.start();
  }

  public stop(): void {
    if (this._animator?.isPlaying()) {
      this._animator?.stop();
    }
  }
}
