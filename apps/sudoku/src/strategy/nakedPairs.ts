import { range } from '@apestaartje/iterator/range/range';

import { GroupCellsBy } from '../grid/GroupCellsBy';
import { SudokuGrid } from '../grid/SudokuGrid';
import { cellsByBlock } from '../grid/cellsByBlock';
import { cellsByColumn } from '../grid/cellsByColumn';
import { cellsByRow } from '../grid/cellsByRow';

type Pair = {
  indices: number[];
  a: number;
  b: number;
};

class PairRegistry {
  private readonly _pairs: Pair[] = [];

  public get(): Pair[] {
    return this._pairs.filter((pair: Pair): boolean => {
      return pair.indices.length > 1;
    });
  }

  public add(a: number, b: number, index: number): void {
    const pair = this.find(a, b);

    if (pair) {
      pair.indices.push(index);
    } else {
      this._pairs.push({
        indices: [index],
        a,
        b,
      });
    }
  }

  public has(a: number, b: number): boolean {
    return this._pairs.some(
      (pair: Pair): boolean => pair.a === a && pair.b === b,
    );
  }

  public find(a: number, b: number): Pair | undefined {
    return this._pairs.find(
      (pair: Pair): boolean => pair.a === a && pair.b === b,
    );
  }
}

export function nakedPairs(grid: SudokuGrid): Promise<number> {
  const groupers: GroupCellsBy[] = [cellsByBlock, cellsByRow, cellsByColumn];
  let solved = 0;

  for (const grouper of groupers) {
    for (const index of range(0, 8)) {
      const pairRegistry = new PairRegistry();

      for (const cell of grouper(grid, index)) {
        if (cell.possibilities.length === 2) {
          pairRegistry.add(
            cell.possibilities[0],
            cell.possibilities[1],
            cell.index,
          );
        }
      }

      const pairs = pairRegistry.get();

      for (const pair of pairs) {
        for (const cell of grouper(grid, index)) {
          if (
            cell.possibilities.length > 1 &&
            !pair.indices.includes(cell.index) &&
            cell.possibilities.includes(pair.a) &&
            cell.possibilities.includes(pair.b)
          ) {
            grid.setPossibilities(
              cell.index,
              cell.possibilities.filter((possibility: number): boolean => {
                return possibility !== pair.a && possibility !== pair.b;
              }),
            );
            solved += 1;
          }
        }
      }
    }
  }

  return new Promise((resolve) => {
    resolve(solved);
  });
}
