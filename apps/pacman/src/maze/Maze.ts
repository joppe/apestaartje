import { Cell } from '@apestaartje/grid/Cell';
import { Grid } from '@apestaartje/grid/Grid';
import { GridPosition } from '@apestaartje/grid/GridPosition';

type MazeOptions = {
  grid: Grid<string>;
  wallChar: string;
};

export class Maze {
  private readonly _grid: Grid<string>;
  private readonly _wallChar: string;

  public get walls(): Cell<string>[] {
    return this._grid.cells.filter((cell) => cell.value === this._wallChar);
  }

  public constructor({ grid, wallChar }: MazeOptions) {
    this._grid = grid;
    this._wallChar = wallChar;
  }

  public isWall(position: GridPosition): boolean {
    return this._grid.getCell(position).value === this._wallChar;
  }
}
