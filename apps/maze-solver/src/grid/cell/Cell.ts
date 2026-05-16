import type { GridPosition } from '../GridPosition';

/**
 * A cell in the maze grid.
 */
export class Cell {
  public readonly row: number;
  public readonly column: number;

  /**
   * Neighbours of the cell. This array holds references to adjacent cells (north, east, south, west) that are directly
   * connected to this cell.
   */
  public neighbours: Cell[] = [];
  protected _north: Cell | undefined;
  protected _east: Cell | undefined;
  protected _south: Cell | undefined;
  protected _west: Cell | undefined;

  /**
   * A map that holds the linked cells. The keys are the cells that are linked to this cell, and the values are boolean
   * (true) indicating that the link exists.
   */
  protected _linked: Map<Cell, boolean> = new Map();

  public set north(cell: Cell | undefined) {
    if (cell !== undefined) {
      this._north = cell;
      this.neighbours.push(cell);
    }
  }

  public get north(): Cell | undefined {
    return this._north;
  }

  public set east(cell: Cell | undefined) {
    if (cell !== undefined) {
      this._east = cell;
      this.neighbours.push(cell);
    }
  }

  public get east(): Cell | undefined {
    return this._east;
  }

  public set south(cell: Cell | undefined) {
    if (cell !== undefined) {
      this._south = cell;
      this.neighbours.push(cell);
    }
  }

  public get south(): Cell | undefined {
    return this._south;
  }

  public set west(cell: Cell | undefined) {
    if (cell !== undefined) {
      this._west = cell;
      this.neighbours.push(cell);
    }
  }

  public get west(): Cell | undefined {
    return this._west;
  }

  public constructor(position: GridPosition) {
    this.row = position.row;
    this.column = position.column;
  }

  public links(): IterableIterator<Cell> {
    return this._linked.keys();
  }

  public linkCount(): number {
    return this._linked.size;
  }

  public link(cell: Cell, mirror = true): void {
    this._linked.set(cell, true);

    if (mirror) {
      cell.link(this, false);
    }
  }

  public unlink(cell: Cell, mirror = true): void {
    this._linked.delete(cell);

    if (mirror) {
      cell.unlink(this, mirror);
    }
  }

  public linked(cell: Cell | undefined): boolean {
    if (cell === undefined) {
      return false;
    }

    return this._linked.has(cell);
  }
}
