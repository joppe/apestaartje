import type { GridPosition } from './GridPosition';

export type CellOptions<T> = {
  row: number;
  column: number;
  value: T;
};

export class Cell<T> {
  protected readonly _row: number;
  protected readonly _column: number;
  protected readonly _value: T;

  public get row(): number {
    return this._row;
  }

  public get column(): number {
    return this._column;
  }

  public get position(): GridPosition {
    return { row: this._row, column: this._column };
  }

  public get value(): T {
    return this._value;
  }

  public constructor({ row, column, value }: CellOptions<T>) {
    this._row = row;
    this._column = column;
    this._value = value;
  }
}
