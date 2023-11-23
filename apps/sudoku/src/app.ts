import { SudokuGrid } from './grid/SudokuGrid';
import { SolutionStrategy } from './strategy/SolutionStrategy';
import { singlePossibilityInGroup } from './strategy/singlePossibilityInGroup';
import { solvedInOtherCell } from './strategy/solvedInOtherCell';
import './style.css';
import { validateSolution } from './validator/validateSolution';
import { createInput } from './view/input';
import { createView } from './view/view';

type AppOptions = {
  container: HTMLElement;
};

enum Mode {
  Normal,
  Edit,
}

const preset = [
  0, 3, 0, 0, 0, 5, 1, 6, 0, 0, 5, 7, 0, 0, 0, 0, 2, 8, 0, 0, 8, 4, 0, 0, 0, 0,
  0, 3, 0, 5, 0, 8, 2, 6, 9, 7, 2, 0, 6, 7, 0, 0, 0, 0, 0, 1, 0, 9, 6, 5, 4, 0,
  8, 3, 0, 6, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 4, 0, 8, 7, 0, 0, 0, 3, 0, 1, 8,
  0, 0, 0,
];
export function app({ container }: AppOptions): void {
  const grid = new SudokuGrid();
  const strategies: SolutionStrategy[] = [
    solvedInOtherCell,
    singlePossibilityInGroup,
  ];

  const root = document.createElement('div');
  root.classList.add('sudoku');

  const view = createView(root);
  const input = createInput(root, preset);

  function setMode(mode: Mode) {
    if (mode === Mode.Edit) {
      root.classList.add('sudoku--edit');
      root.classList.remove('sudoku--normal');
    } else {
      root.classList.add('sudoku--normal');
      root.classList.remove('sudoku--edit');
    }
  }

  async function solve() {
    const values = input.values();

    values.forEach((value: number, index: number): void => {
      if (value === 0) {
        grid.setPossibilities(index, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
      } else {
        grid.setSolution(index, value);
      }
    });

    view.update(grid);
    setMode(Mode.Normal);

    let strategyIndex = 0;

    do {
      const strategy = strategies[strategyIndex];
      const changed = await strategy(grid);

      if (changed > 0) {
        view.update(grid);

        strategyIndex = 0;
      } else {
        strategyIndex += 1;
      }
    } while (strategyIndex < strategies.length);

    view.update(grid);

    if (validateSolution(grid)) {
      console.log('valid solution');
    }
  }

  const button = document.createElement('button');
  button.textContent = 'Solve';
  button.addEventListener('click', solve);

  container.appendChild(button);
  container.appendChild(root);

  setMode(Mode.Edit);
}
