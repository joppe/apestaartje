import { map } from '@apestaartje/iterator/map/map';
import { range } from '@apestaartje/iterator/range/range';
import { random } from '@apestaartje/number/random';

import type { GridOptions } from './GridOptions';
import type { GridPosition } from './GridPosition';

import { Cell } from './cell/Cell';
import { indexToPosition } from './index/indexToPosition';
import { positionToIndex } from './index/positionToIndex';

export class Grid<T extends Cell = Cell> {
  public readonly rows: number;
  public readonly columns: number;
  protected cells: (T | undefined)[] = [];

  protected constructor(options: GridOptions) {
    this.rows = options.rows;
    this.columns = options.columns;
  }

  public setup() {
    this.cells = this.createCells();

    this.assignNeighbours();
  }

  public get size(): number {
    return this.rows * this.columns;
  }

  public forEachCell(callback: (cell: T) => void) {
    this.cells.forEach((cell: T | undefined) => {
      if (cell === undefined) {
        return;
      }

      callback(cell);
    });
  }

  public getRandomCell(): T {
    const index = random(0, this.size - 1);
    const cell = this.cells[index];

    if (cell === undefined) {
      throw new Error('Random cell is undefined');
    }

    return cell;
  }

  public getCell(position: GridPosition): T | undefined {
    if (this.isValidPosition(position)) {
      return this.cells[positionToIndex(position, this.columns)];
    }

    return undefined;
  }

  public isValidPosition(position: GridPosition): boolean {
    return this.isValidRow(position.row) && this.isValidColumn(position.column);
  }

  protected isValidRow(row: number): boolean {
    return row >= 0 && row < this.rows;
  }

  protected isValidColumn(column: number): boolean {
    return column >= 0 && column < this.columns;
  }

  protected createCells(): (T | undefined)[] {
    return map<number, T>(
      range(0, this.size - 1),
      (index) => new Cell(indexToPosition(index, this.columns)) as T,
    );
  }

  protected assignNeighbours(): void {
    this.forEachCell((cell: T | undefined) => {
      if (cell === undefined) {
        return;
      }

      cell.north = this.getCell({ row: cell.row - 1, column: cell.column });
      cell.east = this.getCell({ row: cell.row, column: cell.column + 1 });
      cell.south = this.getCell({ row: cell.row + 1, column: cell.column });
      cell.west = this.getCell({ row: cell.row, column: cell.column - 1 });
    });
  }

  public static factory(options: GridOptions): Grid {
    const grid = new this(options);

    grid.setup();

    return grid;
  }
}
