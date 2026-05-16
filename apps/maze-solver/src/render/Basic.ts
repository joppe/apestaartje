import type { Cell } from '../grid/cell/Cell';
import type { Grid } from '../grid/Grid';
import type { RenderEngine } from './engine/RenderEngine';
import type { Renderer } from './Renderer';

export class Basic implements Renderer {
  protected readonly _grid: Grid;
  protected readonly _engine: RenderEngine;

  public constructor(grid: Grid, engine: RenderEngine) {
    this._grid = grid;
    this._engine = engine;
  }

  public render(container: HTMLElement): void {
    this._engine.setDimensions(this._grid.rows, this._grid.columns);

    this._grid.forEachCell((cell: Cell): void => {
      this.renderCell(cell);
    });

    const maze = this._engine.output();

    container.appendChild(maze);
  }

  protected renderCell(cell: Cell): void {
    this._engine.renderCell(cell);
  }
}
