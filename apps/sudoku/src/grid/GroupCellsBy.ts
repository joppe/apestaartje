import type { Cell, SudokuGrid } from './SudokuGrid';

export type GroupCellsBy = (grid: SudokuGrid, index: number) => Iterable<Cell>;
