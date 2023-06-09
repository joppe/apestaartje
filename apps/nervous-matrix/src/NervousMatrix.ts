import { Chronometer } from '@apestaartje/animation/animator/Chronometer';
import { Asset } from '@apestaartje/animation/stage/Asset';

import { NervousMatrixOptions } from './NervousMatrixOptions';
import { loader } from './image/loader';
import { keyboardListener } from './interaction/keyboardListener';
import { Matrix } from './matrix/Matrix';
import { Grid } from './render/Grid';

export class NervousMatrix implements Asset {
  private readonly _grid: Grid;
  private readonly _matrix: Matrix;

  public constructor(options: NervousMatrixOptions) {
    this._matrix = new Matrix({
      c: options.c,
      k: options.k,
      mass: 1,
      cols: options.cols,
      rows: options.rows,
      offset: options.offset,
      distance: options.distance,
    });

    this._grid = new Grid({
      matrix: this._matrix,
      mapping: options.mapping,
      cols: options.cols,
      rows: options.rows,
      size: options.size,
    });

    keyboardListener(options.displacement, this._matrix, options.mapping);

    loader(options.container, (image: HTMLImageElement | undefined): void => {
      this._grid.image = image;
    });
  }

  public cleanup(): boolean {
    return false;
  }

  public render(time: Chronometer, context: CanvasRenderingContext2D): void {
    const dt: number = time.offset * 0.001;

    this._grid.render(context);
    this._matrix.tick(dt);
  }
}
