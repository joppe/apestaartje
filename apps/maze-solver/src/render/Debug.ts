import type { Distances } from '../distance/Distances';
import type { Cell } from '../grid/cell/Cell';
import type { Grid } from '../grid/Grid';
import type { RenderEngine } from './engine/RenderEngine';
import type { Renderer } from './Renderer';

import { Basic } from './Basic';

export class Debug extends Basic implements Renderer {
  protected _distances: Distances;

  public constructor(grid: Grid, engine: RenderEngine, distances: Distances) {
    super(grid, engine);

    this._distances = distances;
  }

  protected renderCell(cell: Cell): void {
    const distance = this._distances.hasDistance(cell)
      ? String(this._distances.getDistance(cell))
      : '';

    this._engine.renderCell(cell, distance);
  }
}
