import type { SudokuGrid } from '../grid/SudokuGrid';

export type SolutionStrategy = (grid: SudokuGrid) => Promise<number>;
