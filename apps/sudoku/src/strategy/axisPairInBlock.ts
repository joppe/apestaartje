import type { GridPosition } from '@apestaartje/grid/grid/GridPosition';
import { range } from '@apestaartje/iterator/range/range';

import type { Axis } from '../grid/Axis';
import type { SudokuGrid } from '../grid/SudokuGrid';
import { cellsByAxisFromBlock } from '../grid/cellsByAxisFromBlock';
import { blockAxisIndexToGridAxisIndex } from '../grid/helper/blockAxisIndexToGridAxisIndex';
import { otherAxisIndicesOutsideBlock } from '../grid/helper/otherAxisIndicesOutsideBlock';

class PossibilityRegistry {
  private readonly _possibilities: Map<number, number> = new Map();

  public add(possibilities: number[]): void {
    if (possibilities.length === 1) {
      return;
    }

    possibilities.forEach((possibility: number): void => {
      const count = this._possibilities.get(possibility) ?? 0;

      this._possibilities.set(possibility, count + 1);
    });
  }

  public remove(possibilities: number[]): void {
    possibilities.forEach((possibility: number): void => {
      this._possibilities.set(possibility, 0);
    });
  }

  public shared(): number[] {
    const shared: number[] = [];

    this._possibilities.forEach((count: number, possibility: number): void => {
      if (count > 1) {
        shared.push(possibility);
      }
    });

    return shared;
  }
}

export function axisPairInBlock(grid: SudokuGrid): Promise<number> {
  let solved = 0;
  const axises: Axis[] = ['row', 'column'];

  for (const axis of axises) {
    for (const blockIndex of range(0, 8)) {
      for (const blockAxisIndex of range(0, 2)) {
        const registry = new PossibilityRegistry();

        for (const cell of cellsByAxisFromBlock(
          grid,
          blockIndex,
          blockAxisIndex,
          axis,
        )) {
          registry.add(cell.possibilities);
        }

        for (const otherBlockAxisIndex of range(0, 2)) {
          if (otherBlockAxisIndex === blockAxisIndex) {
            continue;
          }

          for (const otherCell of cellsByAxisFromBlock(
            grid,
            blockIndex,
            otherBlockAxisIndex,
            axis,
          )) {
            registry.remove(otherCell.possibilities);
          }
        }

        const sharedPossibilities = registry.shared();

        if (sharedPossibilities.length > 0) {
          const axisIndex = blockAxisIndexToGridAxisIndex(
            blockIndex,
            blockAxisIndex,
            axis,
          );
          const otherAxisIndices = otherAxisIndicesOutsideBlock(
            blockIndex,
            axis,
          );

          for (const sharedPossibility of sharedPossibilities) {
            for (const otherAxisIndex of otherAxisIndices) {
              const position = {
                [axis]: axisIndex,
                [axis === 'row' ? 'column' : 'row']: otherAxisIndex,
              } as GridPosition;
              const cell = grid.getCellByPosition(position);

              if (
                cell.possibilities.length > 1 &&
                cell.possibilities.includes(sharedPossibility)
              ) {
                grid.setPossibilities(
                  cell.index,
                  cell.possibilities.filter((possibility: number): boolean => {
                    return possibility !== sharedPossibility;
                  }),
                );
                solved += 1;
              }
            }
          }
        }
      }
    }
  }

  return new Promise((resolve) => {
    resolve(solved);
  });
}
