import { Animator } from '@apestaartje/animation/animator/Animator';
import type { Size } from '@apestaartje/geometry/size/Size';
import type { Vector } from '@apestaartje/geometry/vector/Vector';
import type { Observable } from '@apestaartje/observable/observable/Observable';
import type { Subscription } from '@apestaartje/observable/observable/Subscription';
import { Subject } from '@apestaartje/observable/subject/Subject';
import type { Store } from '@apestaartje/store/Store';

import { Action } from '../control/Action';
import type { Control } from '../control/Control';
import { container } from '../dependency-injection/container';
import type { Cell } from '../grid/Cell';
import { Grid } from '../grid/Grid';
import type { Data } from '../store/Data';
import type { Tetromino } from '../tetromino/Tetromino';
import type { TetrominoData } from '../tetromino/TetrominoData';
import type { Type } from '../tetromino/Type';
import { random } from '../tetromino/random/random';

const INITIAL_SPEED: number = 5;
const SPEED_INCREMENT: number = 5;
const MAX_SPEED: number = 60;

export class Engine {
  private _current: Tetromino;
  private _counter: number = 0;
  private _factor: number;
  private _next: Tetromino | undefined;
  private _speed: number = INITIAL_SPEED;
  private _subscription: Subscription;
  private _totalLines: number = 0;
  private readonly _animator: Animator;
  private readonly _control: Control;
  private readonly _grid: Grid<Type>;
  private readonly _size: Size;
  private readonly _store: Store<Data>;
  private readonly _gameOver: Subject<boolean> = new Subject();

  get gameOver(): Observable<boolean> {
    return this._gameOver.asObservable();
  }

  public constructor(size: Size, control: Control) {
    this._size = size;
    this._control = control;

    this._factor = MAX_SPEED - this._speed;
    this._grid = new Grid<Type>(this._size);
    this._store = container.resolve('store');
    this._animator = new Animator((): boolean => {
      this._counter += 1;

      if (this._counter % this._factor === 0) {
        return this.tick();
      } else {
        return true;
      }
    });
  }

  public start(): void {
    if (this._animator.isPlaying()) {
      return;
    }

    this.generate();

    this._subscription = this._control.subscribe({
      next: (action: Action): void => {
        this.onAction(action);
      },
    });

    this._animator.start();
  }

  public reset(): void {
    this._next = undefined;
    this._speed = INITIAL_SPEED;
    this._counter = 0;
    this._grid.reset();

    this._store.set('next', undefined);
    this._store.set('current', undefined);
    this._store.set('score', 0);
    this._store.set('cells', []);
  }

  public stop(): void {
    if (!this._animator.isPlaying()) {
      return;
    }

    this._subscription.unsubscribe();
    this._animator.stop();
  }

  private increaseSpeed(): void {
    this._speed += SPEED_INCREMENT;
    this._factor = MAX_SPEED - this._speed;
  }

  private onAction(action: Action): void {
    switch (action) {
      case Action.Left:
        this.place(this._current.move({ x: -1, y: 0 }));
        break;
      case Action.Right:
        this.place(this._current.move({ x: 1, y: 0 }));
        break;
      case Action.Down:
        this.place(this._current.move({ x: 0, y: 1 }));
        break;
      case Action.ClockWise:
        this.place(this._current.rotate(90));
        break;
      case Action.CounterClockWise:
        this.place(this._current.rotate(-90));
        break;
    }
  }

  private tick(): boolean {
    if (this.place(this._current.move({ x: 0, y: 1 }))) {
      return true;
    }

    this.seal();

    if (this.generate()) {
      return true;
    }

    this._gameOver.next(true);

    return false;
  }

  private seal(): void {
    const lines: number[] = [];

    this._current.data.blocks.forEach((block: Vector): void => {
      this._grid.setCell(block, this._current.type);

      if (this.isFullLine(block.y)) {
        lines.push(block.y);
      }
    });

    if (lines.length > 0) {
      this._store.set(
        'score',
        <number>this._store.get('score') + Math.pow(2, lines.length) * 25,
      );
      this._grid.removeLines(lines);

      this._totalLines += 1;

      if (this._totalLines % 5 === 0) {
        this.increaseSpeed();
      }
    }

    this._store.set('cells', this._grid.getCells());
  }

  private isFullLine(y: number): boolean {
    return Array.from(this._grid.getLine(y)).every(
      (cell: Cell<string | undefined>): boolean => {
        return cell.value !== undefined;
      },
    );
  }

  private place(tetromino: Tetromino): boolean {
    const data: TetrominoData = tetromino.data;

    if (this.fits(data)) {
      this._current = tetromino;
      this._store.set('current', data);

      return true;
    }

    return false;
  }

  private generate(): boolean {
    if (this._next === undefined) {
      this._current = random();
    } else {
      this._current = this._next;
    }

    this._next = random();
    this._current.position = {
      x: Math.round(this._size.width / 2 - this._current.center.x),
      y: 0,
    };

    if (this.fits(this._current.data)) {
      this._store.set('current', this._current.data);
      this._store.set('next', this._next.data);

      return true;
    }

    return false;
  }

  private fits(data: TetrominoData): boolean {
    return data.blocks.every((block: Vector) => {
      if (block.x < 0 || block.x >= this._size.width) {
        return false;
      }

      const cell: Cell<string | undefined> | undefined =
        this._grid.getCell(block);

      return cell !== undefined && cell.value === undefined;
    });
  }
}
