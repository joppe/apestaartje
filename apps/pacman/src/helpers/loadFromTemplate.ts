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

  const cells = Array.from({ length: rowLength * columnLength }, () => '');
  const grid = new Grid<string>({
    rows: rowLength,
    columns: columnLength,
    cells,
  });

  rows.forEach((row: string, rowIndex: number) => {
    row.split('').forEach((cell: string, columnIndex: number) => {
      grid.setCell(
        {
          row: rowIndex,
          column: columnIndex,
        },
        cell,
      );
    });
  });

  return grid;
}
