import { Size } from '@apestaartje/geometry/size/Size';

import { Column } from '../Column';

import { Config } from './Config';

export class Factory {
  private readonly _columns: Map<number, Column> = new Map();
  private readonly _positions: number[];
  private readonly _config: Config;
  private readonly _size: Size;

  get positions(): number[] {
    return this._positions.filter((postion) => {
      return this._columns.has(postion) === false;
    });
  }

  constructor(size: Size, config: Config) {
    const count = Math.floor(size.width / config.fontSize);

    this._size = size;
    this._config = config;
    this._positions = Array.from({ length: count }, (_, i) => i);
  }

  public tick(): Column | undefined {
    this.cleanup();

    const r = Math.random() * 100;

    if (r > 90) {
      return this.create();
    }

    return undefined;
  }

  private cleanup() {
    this._columns.forEach((column, x) => {
      if (column.cleanup()) {
        this._columns.delete(x);
      }
    });
  }

  private create(): Column | undefined {
    const x = this.randomPosition();

    if (x === undefined) {
      return undefined;
    }

    const column = new Column(this._size, {
      fontSize: this._config.fontSize,
      x: x * this._config.fontSize,
    });

    this._columns.set(x, column);

    return column;
  }

  private randomPosition(): number | undefined {
    const positions = this.positions;

    if (positions.length === 0) {
      return undefined;
    }

    const index = Math.floor(Math.random() * positions.length);

    return positions[index];
  }
}
