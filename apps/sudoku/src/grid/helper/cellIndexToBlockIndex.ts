export function cellIndexToBlockIndex(cellIndex: number): number {
  const cellColumn = cellIndex % 9;
  const cellRow = Math.floor(cellIndex / 9);
  const column = Math.floor(cellColumn / 3);
  const row = Math.floor(cellRow / 3);

  return column + row * 3;
}
