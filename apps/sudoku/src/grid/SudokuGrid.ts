import { Grid } from '@apestaartje/grid/grid/Grid';
import type { GridPosition } from '@apestaartje/grid/grid/GridPosition';

export type Cell = {
  index: number;
  possibilities: number[];
};

export class SudokuGrid {
  private readonly _grid: Grid<Cell>;

  public get cells(): Cell[] {
    return this._grid.cells;
  }

  constructor() {
    this._grid = new Grid<Cell>({
      rows: 9,
      columns: 9,
      initializer: ({ index }) => {
        return {
          index,
          possibilities: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        };
      },
    });
  }

  public getCell(index: number): Cell {
    const position = this._grid.toPosition(index);

    return this._grid.getCell(position);
  }

  public getCellByPosition(position: GridPosition): Cell {
    return this._grid.getCell(position);
  }

  public getPosition(index: number): GridPosition {
    return this._grid.toPosition(index);
  }

  public setPossibilities(index: number, possibilities: number[]): void {
    const position = this._grid.toPosition(index);

    this._grid.setCell(position, { index, possibilities });
  }

  public setSolution(index: number, solution: number): void {
    const position = this._grid.toPosition(index);

    this._grid.setCell(position, { index, possibilities: [solution] });
  }
}
