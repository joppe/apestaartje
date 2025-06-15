import type { Asset } from '@apestaartje/animation/stage/Asset';
import { Grid } from '@apestaartje/grid/grid/Grid';
import type { GridPosition } from '@apestaartje/grid/grid/GridPosition';

import type { Renderer } from '../render/Renderer';

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
    this._grid = new Grid({ rows, columns, initializer: () => false });
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
    this._grid.setCell(position, true);
  }

  public isWall(position: GridPosition): boolean {
    return this._grid.getCell(position);
  }

  public cleanup(): boolean {
    return false;
  }

  public tick(): void {
    // Nothing to calculate
  }

  public render(context: CanvasRenderingContext2D): void {
    this._grid.cells.forEach((value: boolean, index: number): void => {
      if (!value) {
        return;
      }

      const position = this._grid.toPosition(index);

      this._renderer.wall(position, context);
    });
  }
}
