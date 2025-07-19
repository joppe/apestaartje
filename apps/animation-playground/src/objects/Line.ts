import type { Chronometer } from '@apestaartje/animation/animator/Chronometer';
import type { Asset } from '@apestaartje/animation/stage/Asset';
import type { Vector } from '@apestaartje/geometry/vector/Vector';

import { line } from '../draw/shapes';

type LineProps = {
  start: Vector;
  end: Vector;
  color: string;
  width: number;
};

export class Line implements Asset {
  private _start: Vector;
  private _end: Vector;
  private _color: string;
  private _width: number;

  set end(value: Vector) {
    this._end = value;
  }

  set color(value: string) {
    this._color = value;
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
