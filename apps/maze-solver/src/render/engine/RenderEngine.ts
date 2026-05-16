import type { Cell } from '../../grid/cell/Cell';

export type CellStyle = {
  color?: string;
  background?: string;
};

export interface RenderEngine {
  renderCell(cell: Cell, content?: string, style?: CellStyle): void;
  setDimensions(rows: number, columns: number): void;
  output(): HTMLElement;
}
