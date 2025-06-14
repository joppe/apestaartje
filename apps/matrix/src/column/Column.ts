import { Asset } from '@apestaartje/animation/stage/Asset';
import { Size } from '@apestaartje/geometry/size/Size';

import { random } from '../chars';

import { Char } from './Char';
import { Config } from './Config';

export class Column implements Asset {
  private _fontSize: number;
  private _chars: Char[] = [];
  private _x: number;
  private _counter = 1;
  private _maxChars: number;
  private _cleanup = false;
  private _fadeCount = 0;

  get id(): number {
    return this._x;
  }

  constructor(size: Size, { fontSize, x }: Config) {
    this._fontSize = fontSize;
    this._x = x;
    this._maxChars = Math.floor(Math.floor(size.height / fontSize) * 1.5);
  }

  public cleanup(): boolean {
    return this._cleanup;
  }

  public tick(): void {
    // Do nothing
  }

  public render(ctx: CanvasRenderingContext2D): void {
    let y = 0;

    this._counter += 1;

    ctx.font = `${this._fontSize}px matrix`;

    this._chars.forEach((char, index) => {
      if (char.random) {
        if (Math.random() * 10 > 9.8) {
          char.char = random();
        }
      }

      const text = ctx.measureText(char.char);
      const isLast = index === this._chars.length - 1;
      const xOffset = (this._fontSize - text.width) / 2;

      ctx.fillStyle = isLast ? '#fff' : `rgba(0, 203, 0, ${char.opacity})`;
      ctx.fillText(char.char, this._x + xOffset, y);

      y += this._fontSize;
    });

    if (this._counter % 4 === 0) {
      if (this._chars.length < this._maxChars) {
        this._chars.push({
          random: Math.random() * 10 > 9,
          char: random(),
          opacity: 100,
        });
      }

      if (this._chars.length === this._maxChars) {
        this._fadeCount += 1;
      }

      if (this._fadeCount === this._maxChars) {
        this._cleanup = true;
      }

      for (let index = 0; index < this._fadeCount; index += 1) {
        this._chars[index].opacity = this.opacity(index);
      }
    }
  }

  private opacity(index: number): number {
    const diff = this._fadeCount - index;

    if (diff <= 0) {
      return 1;
    }

    if (diff > 10) {
      return 0;
    }

    return 1 / diff;
  }
}
