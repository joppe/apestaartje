import { Asset } from '@apestaartje/animation/stage/Asset';

import { Maze } from './Maze';

type MazeRendererOptions = {
  maze: Maze;
  unitSize: number;
  color: string;
};

export class MazeRenderer implements Asset {
  private readonly _maze: Maze;
  private readonly _unitSize: number;
  private readonly _color: string;

  public constructor({ maze, unitSize, color }: MazeRendererOptions) {
    this._maze = maze;
    this._unitSize = unitSize;
    this._color = color;
  }

  public cleanup(): boolean {
    return false;
  }

  public tick(): void {
    // Nothing to calculate
  }

  public render(context: CanvasRenderingContext2D): void {
    this._maze.walls.forEach((cell) => {
      context.fillStyle = this._color;
      context.fillRect(
        cell.column * this._unitSize,
        cell.row * this._unitSize,
        this._unitSize,
        this._unitSize,
      );
    });
  }
}
