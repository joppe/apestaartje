import type { GridPosition } from '../GridPosition';

import { Cell } from './Cell';

/**
 * A cell in a polar grid. It has a position and a theta value, which is the angle of the cell in radians.
 * It also has four neighbours: cw, ccw, inward and outward. The cw and ccw neighbours are the cells that are
 */
export class PolarCell extends Cell {
  /**
   * The angle of the cell in radians. It is calculated based on the position of the cell in the polar grid.
   */
  public readonly theta: number;

  /**
   * The neighbours of the cell. The cw and ccw neighbours are the cells that are adjacent to this cell in the clockwise
   * and counterclockwise directions, respectively. The inward neighbour is the cell that is adjacent to this cell in
   * the inward direction (towards the center of the polar grid), and the outward neighbours are the cells that are
   * adjacent to this cell in the outward direction (away from the center of the polar grid).
   */
  protected _cw: PolarCell | undefined;
  protected _ccw: PolarCell | undefined;

  /**
   * The inward neighbour is the cell that is adjacent to this cell in the inward direction (towards the center of the
   * polar grid), and the outward neighbours are the cells that are adjacent to this cell in the outward direction (away
   * from the center of the polar grid).
   */
  protected _inward: PolarCell | undefined;
  protected _outward: PolarCell[] = [];

  public constructor(position: GridPosition, theta: number) {
    super(position);

    this.theta = theta;
  }

  public set cw(cell: PolarCell | undefined) {
    if (cell !== undefined) {
      this._cw = cell;
      this.neighbours.push(cell);
    }
  }

  public get cw(): PolarCell | undefined {
    return this._cw;
  }

  public set ccw(cell: PolarCell | undefined) {
    if (cell !== undefined) {
      this._ccw = cell;
      this.neighbours.push(cell);
    }
  }

  public get ccw(): PolarCell | undefined {
    return this._ccw;
  }

  public set inward(cell: PolarCell | undefined) {
    if (cell !== undefined) {
      this._inward = cell;
      this.neighbours.push(cell);
    }
  }

  public get inward(): PolarCell | undefined {
    return this._inward;
  }

  public addOutward(cell: PolarCell | undefined) {
    if (cell !== undefined) {
      this._outward.push(cell);
      this.neighbours.push(cell);
    }
  }

  public get outward(): PolarCell[] {
    return this._outward;
  }
}
