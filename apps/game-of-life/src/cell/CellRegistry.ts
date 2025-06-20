import type { Cell } from './Cell';
import type { CellCollection } from './CellCollection';

export type CellRegistry = {
  add(x: number, y: number): Cell;

  remove(x: number, y: number): void;

  find(x: number, y: number): Cell | undefined;

  findById(id: string): Cell | undefined;

  exists(x: number, y: number): boolean;

  get(): CellCollection;

  set(cells: Cell[]): void;

  surroundingCells(x: number, y: number): Cell[];

  neighborCount(x: number, y: number): number;
};
