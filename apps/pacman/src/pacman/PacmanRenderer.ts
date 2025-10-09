import { Chronometer } from '@apestaartje/animation/animator/Chronometer';
import { Asset } from '@apestaartje/animation/stage/Asset';
import { Timer } from '@apestaartje/animation/timer/Timer';

import sprite from '../../assets/pacman.gif';

import { Pacman } from './Pacman';

type PacmanRendererOptions = {
  pacman: Pacman;
  unitSize: number;
  stepsPerUnit: number;
};

export class PacmanRenderer implements Asset {
  private readonly _pacman: Pacman;
  private readonly _unitSize: number;
  private readonly _stepSize: number;
  private readonly _sprite: HTMLImageElement;
  private _frame = 0;
  private _frameCount = 7;
  private _ready = false;
  private _timer: Timer;

  get ready(): boolean {
    return this._ready;
  }

  public constructor({
    pacman,
    unitSize,
    stepsPerUnit,
  }: PacmanRendererOptions) {
    this._pacman = pacman;
    this._unitSize = unitSize;
    this._stepSize = unitSize / stepsPerUnit;

    this._sprite = new Image();
    this._sprite.onload = (): void => {
      this._ready = true;
    };
    this._sprite.src = sprite;
    this._timer = new Timer(100);
  }

  public cleanup(): boolean {
    return false;
  }

  public tick(time: Chronometer): void {
    this._timer.update(time.offset);

    if (this._timer.isReady) {
      this._frame += 1;
      this._pacman.move();

      this._timer.reset();
    }
  }

  public render(context: CanvasRenderingContext2D): void {
    if (!this._ready) {
      console.log('Not ready');
    }

    const position = {
      x: this._pacman.position.x * this._stepSize,
      y: this._pacman.position.y * this._stepSize,
    };

    const sWidth = Math.round(this._sprite.width / this._frameCount);
    const sx = (this._frame % this._frameCount) * sWidth;

    context.setTransform(
      1,
      0,
      0,
      1,
      position.x + this._unitSize / 2,
      position.y + this._unitSize / 2,
    );

    if (this._pacman.direction.x === -1) {
      context.rotate(Math.PI);
    } else if (this._pacman.direction.y === -1) {
      context.rotate(-Math.PI / 2);
    } else if (this._pacman.direction.y === 1) {
      context.rotate(Math.PI / 2);
    }

    context.drawImage(
      this._sprite,
      sx,
      0,
      sWidth,
      this._sprite.height,
      -this._unitSize / 2,
      -this._unitSize / 2,
      this._unitSize,
      this._unitSize,
    );
  }
}
