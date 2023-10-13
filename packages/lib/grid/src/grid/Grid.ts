import { Cell } from './Cell';
import { GridPosition } from './GridPosition';

export type GridOptions<T> = {
  rows: number;
  columns: number;
  initialValue: T;
};

export class Grid<T> {
  private readonly _rows: number;
  private readonly _columns: number;
  private _cells: Cell<T>[];

  public get rows(): number {
    return this._rows;
  }

  public get columns(): number {
    return this._columns;
  }

  public get size(): number {
    return this._rows * this._columns;
  }

  public get cells(): Cell<T>[] {
    return this._cells;
  }

  constructor({ rows, columns, initialValue }: GridOptions<T>) {
    this._rows = rows;
    this._columns = columns;
    this._cells = Array.from(
      { length: this.size },
      (_: unknown, index: number) => {
        const row = this.toRow(index);
        const column = this.toColumn(index);

        return new Cell({
          row,
          column,
          value: initialValue,
        });
      },
    );
  }

  public getCell(position: GridPosition): Cell<T> {
    return this._cells[this.toIndex(position)];
  }

  public setCell(position: GridPosition, cell: Cell<T>): void {
    this._cells[this.toIndex(position)] = cell;
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
