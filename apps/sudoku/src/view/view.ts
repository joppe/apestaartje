import { range } from '@apestaartje/iterator/range/range';

import type { Cell, SudokuGrid } from '../grid/SudokuGrid';

export type View = {
  update(grid: SudokuGrid): void;
};

export function createView(root: HTMLElement): View {
  const container = document.createElement('div');
  container.classList.add('view');

  for (const index of range(0, 80)) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = index.toString();

    const possibilities = document.createElement('div');
    possibilities.classList.add('possibilities');

    const solution = document.createElement('div');
    solution.classList.add('solution');

    for (const possibility of range(0, 8)) {
      const element = document.createElement('div');
      element.classList.add('possibility');
      element.textContent = `${possibility + 1}`;

      possibilities.appendChild(element);
      possibilities.classList.add(`possibilities--${possibility + 1}`);
    }

    cell.appendChild(possibilities);
    cell.appendChild(solution);
    container.appendChild(cell);
  }

  root.appendChild(container);

  return {
    update(grid: SudokuGrid): void {
      grid.cells.forEach((cell: Cell, index: number): void => {
        const element = container.querySelector(
          `[data-index="${index}"]`,
        ) as HTMLElement;

        if (cell.possibilities.length === 1) {
          const solution = element.querySelector('.solution') as HTMLElement;
          solution.textContent = cell.possibilities[0].toString();

          element.classList.add('cell--solved');
        } else {
          const possibilities = element.querySelector(
            '.possibilities',
          ) as HTMLElement;

          for (const possibility of range(0, 8)) {
            if (!cell.possibilities.includes(possibility + 1)) {
              possibilities.classList.remove(
                `possibilities--${possibility + 1}`,
              );
            }
          }
        }
      });
    },
  };
}
