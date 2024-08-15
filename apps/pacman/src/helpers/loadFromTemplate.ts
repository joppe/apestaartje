import { Cell } from '@apestaartje/grid/Cell';
import { Grid } from '@apestaartje/grid/Grid';

export function loadFromTemplate(template: string): Grid<string> {
  if (template.length === 0) {
    throw new Error('The template should not be empty.');
  }

  const rows = template.split('\n');
  const columnLength = rows[0].length;
  const rowLength = rows.length;

  if (rows.some((row) => row.length !== columnLength)) {
    throw new Error('All rows should have the same amount of columns.');
  }

  const grid = new Grid<string>({
    rows: rowLength,
    columns: columnLength,
    initialValue: '',
  });

  rows.forEach((row: string, rowIndex: number) => {
    row.split('').forEach((cell: string, columnIndex: number) => {
      grid.setCell(
        new Cell({
          row: rowIndex,
          column: columnIndex,
          value: cell,
        }),
      );
    });
  });

  return grid;
}
