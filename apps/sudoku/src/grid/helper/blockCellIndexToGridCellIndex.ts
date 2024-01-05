import { blockFirstCellGridIndex } from './blockFirstCellGridIndex';

export function blockCellIndexToGridCellIndex(
  blockIndex: number,
  nth: number,
): number {
  const start = blockFirstCellGridIndex(blockIndex);

  return start + (nth % 3) + Math.floor(nth / 3) * 9;
}
