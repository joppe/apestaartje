import { Chronometer } from '@apestaartje/animation/animator/Chronometer';
import { Asset } from '@apestaartje/animation/stage/Asset';
import { Cell } from '@apestaartje/grid/grid/Cell';
import { Grid } from '@apestaartje/grid/grid/Grid';
import { GridPosition } from '@apestaartje/grid/grid/GridPosition';

import { Renderer } from '../render/Renderer';

export type MapOptions = {
  renderer: Renderer;
  rows: number;
  columns: number;
};

export class Map implements Asset {
  private readonly _renderer: Renderer;
  private readonly _grid: Grid<boolean>;

  public get columns(): number {
    return this._grid.columns;
  }

  public get rows(): number {
    return this._grid.rows;
  }

  constructor({ renderer, rows, columns }: MapOptions) {
    this._renderer = renderer;
    this._grid = new Grid({ rows, columns, initialValue: false });
  }

  public randomFreePosition(): GridPosition {
    const position: GridPosition = {
      column: Math.floor(Math.random() * this._grid.columns),
      row: Math.floor(Math.random() * this._grid.rows),
    };

    if (this.isWall(position)) {
      return this.randomFreePosition();
    }

    return position;
  }

  public addWall(position: GridPosition): void {
    this._grid.setCell(position, new Cell({ value: true, ...position }));
  }

  public isWall(position: GridPosition): boolean {
    return this._grid.getCell(position).value;
  }

  public cleanup(): boolean {
    return false;
  }

  public tick(_time: Chronometer): void {
    // Nothing to calculate
  }

  public render(context: CanvasRenderingContext2D): void {
    this._grid.cells.forEach((cell: Cell<boolean>) => {
      if (!cell.value) {
        return;
      }

      this._renderer.wall(cell.position, context);
    });
  }
}
