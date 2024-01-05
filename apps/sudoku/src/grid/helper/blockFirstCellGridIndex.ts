export function blockFirstCellGridIndex(blockIndex: number): number {
  const column = blockIndex % 3;
  const row = Math.floor(blockIndex / 3);

  return column * 3 + row * 27;
}
