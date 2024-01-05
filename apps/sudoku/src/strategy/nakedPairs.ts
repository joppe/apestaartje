import { range } from '@apestaartje/iterator/range/range';

import { GroupCellsBy } from '../grid/GroupCellsBy';
import { SudokuGrid } from '../grid/SudokuGrid';
import { cellsByBlock } from '../grid/cellsByBlock';
import { cellsByColumn } from '../grid/cellsByColumn';
import { cellsByRow } from '../grid/cellsByRow';

type Pair = {
  count: number;
  a: number;
  b: number;
};

class PairRegistry {
  private readonly _pairs: Pair[] = [];

  public numbers(): number[] {
    return this._pairs.reduce((numbers: number[], pair: Pair): number[] => {
      if (pair.count === 2) {
        numbers.push(pair.a, pair.b);
      }

      return numbers;
    }, []);
  }

  public add(a: number, b: number): void {
    const pair = this.find(a, b);

    if (pair) {
      pair.count += 1;
    } else {
      this._pairs.push({
        count: 1,
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
      const pairs = new PairRegistry();

      for (const cell of grouper(grid, index)) {
        if (cell.possibilities.length === 2) {
          pairs.add(cell.possibilities[0], cell.possibilities[1]);
        }
      }

      const numbers = pairs.numbers();

      if (numbers.length > 0) {
        for (const cell of grouper(grid, index)) {
          if (
            cell.possibilities.length > 2 ||
            (cell.possibilities.length === 2 &&
              !pairs.has(cell.possibilities[0], cell.possibilities[1]))
          ) {
            grid.setPossibilities(
              cell.index,
              cell.possibilities.filter(
                (possibility: number): boolean =>
                  !numbers.includes(possibility),
              ),
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
