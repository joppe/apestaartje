import type { Distances } from '../distance/Distances';
import type { Cell } from '../grid/cell/Cell';
import type { Grid } from '../grid/Grid';
import type { RenderEngine } from './engine/RenderEngine';
import type { Renderer } from './Renderer';

import { calculate } from '../distance/calculate';
import { max } from '../distance/max';
import { pathTo } from '../distance/pathTo';
import { Debug } from './Debug';

export class LongestPath extends Debug implements Renderer {
  public constructor(grid: Grid, engine: RenderEngine, distances: Distances) {
    super(grid, engine, distances);

    this._distances = this.getPath();
  }

  protected getPath(): Distances {
    const start = this._grid.getCell({ row: 0, column: 0 }) as Cell;
    const distances = calculate(start);
    const [newStart] = max(distances);
    const newDistances = calculate(newStart);
    const [goal] = max(newDistances);

    return pathTo(newStart, goal);
  }
}
