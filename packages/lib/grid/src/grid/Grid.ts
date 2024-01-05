import { GridPosition } from './GridPosition';

export type GridOptions<T> = {
  rows: number;
  columns: number;
  initializer: Initializer<T>;
};

export type InitializerOptions = GridPosition & {
  index: number;
};

export type Initializer<T> = (options: InitializerOptions) => T;

export class Grid<T> {
  private readonly _rows: number;
  private readonly _columns: number;
  private _cells: T[];

  public get rows(): number {
    return this._rows;
  }

  public get columns(): number {
    return this._columns;
  }

  public get size(): number {
    return this._rows * this._columns;
  }

  public get cells(): T[] {
    return this._cells;
  }

  constructor({ rows, columns, initializer }: GridOptions<T>) {
    this._rows = rows;
    this._columns = columns;
    this._cells = Array.from(
      { length: this.size },
      (_: unknown, index: number) => {
        const row = this.toRow(index);
        const column = this.toColumn(index);

        return initializer({ row, column, index });
      },
    );
  }

  public getCell(position: GridPosition): T {
    return this._cells[this.toIndex(position)];
  }

  public setCell(position: GridPosition, value: T): void {
    this._cells[this.toIndex(position)] = value;
  }

  public isValidPosition({ row, column }: GridPosition): boolean {
    return this.isValidRow(row) && this.isValidColumn(column);
  }

  public isValidRow(row: number): boolean {
    return row >= 0 && row < this._rows;
  }

  public isValidColumn(column: number): boolean {
    return column >= 0 && column < this._columns;
  }

  public toPosition(index: number): GridPosition {
    return {
      row: this.toRow(index),
      column: this.toColumn(index),
    };
  }

  public toIndex({ row, column }: GridPosition): number {
    if (this.isValidPosition({ row, column }) === false) {
      throw new Error(`Invalid position row: ${row}, column: ${column}.`);
    }

    return row * this._columns + column;
  }

  public toRow(index: number): number {
    return Math.floor(index / this._columns);
  }

  public toColumn(index: number): number {
    return index % this._columns;
  }
}
