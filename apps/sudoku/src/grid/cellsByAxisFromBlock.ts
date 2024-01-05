import { Axis } from './Axis';
import { Cell, SudokuGrid } from './SudokuGrid';
import { cellsByColumnFromBlock } from './cellsByColumnFromBlock';
import { cellsByRowFromBlock } from './cellsByRowFromBlock';

export function cellsByAxisFromBlock(
  grid: SudokuGrid,
  blockIndex: number,
  axisIndex: number,
  axis: Axis,
): Iterable<Cell> {
  if (axis === 'row') {
    return cellsByRowFromBlock(grid, blockIndex, axisIndex);
  }

  return cellsByColumnFromBlock(grid, blockIndex, axisIndex);
}
