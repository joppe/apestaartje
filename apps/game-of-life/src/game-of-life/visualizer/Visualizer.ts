import type { Asset } from '@apestaartje/animation/stage/Asset';

import type { Config } from '../types/Config';

import { type Universe, Cell } from '../../../wasm';
import { memory } from '../../../wasm/index_bg.wasm';

type VisualizerProps = {
  universe: Universe;
  config: Config;
};

export class Visualizer implements Asset {
  private readonly _universe: Universe;
  private readonly _config: Config;
  private readonly _width: number;
  private readonly _height: number;

  public constructor({ universe, config }: VisualizerProps) {
    this._universe = universe;
    this._config = config;

    this._width = universe.width();
    this._height = universe.height();
  }

  public cleanup(): boolean {
    return false;
  }

  public tick(): void {
    this._universe.tick();
  }

  public render(ctx: CanvasRenderingContext2D): void {
    const cellsPtr = this._universe.cells();
    const cells = new Uint8Array(
      memory.buffer,
      cellsPtr,
      this._width * this._height,
    );

    ctx.beginPath();

    for (let row = 0; row < this._height; row++) {
      for (let col = 0; col < this._width; col++) {
        const idx = this._universe.get_index(row, col);

        ctx.fillStyle =
          cells[idx] === Cell.Dead
            ? this._config.colors.dead
            : this._config.colors.alive;

        ctx.fillRect(
          col * (this._config.cell.size + this._config.cell.border) +
            this._config.cell.border,
          row * (this._config.cell.size + this._config.cell.border) +
            this._config.cell.border,
          this._config.cell.size,
          this._config.cell.size,
        );
      }
    }

    ctx.stroke();
  }
}
