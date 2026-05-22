import type { Grid } from '@apestaartje/grid/Grid';
import type { GridPosition } from '@apestaartje/grid/GridPosition';

type MazeOptions = {
  grid: Grid<string>;
  wallChar: string;
};

export class Maze {
  private readonly _grid: Grid<string>;
  private readonly _wallChar: string;

  public get walls(): GridPosition[] {
    return this._grid.cells
      .map((cell, index) => {
        const position = this._grid.toPosition(index);

        if (cell === this._wallChar) {
          return position;
        }

        return null;
      })
      .filter((position): position is GridPosition => position !== null);
  }

  public constructor({ grid, wallChar }: MazeOptions) {
    this._grid = grid;
    this._wallChar = wallChar;
  }

  public isWall(position: GridPosition): boolean {
    return this._grid.getCell(position) === this._wallChar;
  }
}
