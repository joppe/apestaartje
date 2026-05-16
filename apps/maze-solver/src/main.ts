import type { Renderer } from './render/Renderer';

import { calculate } from './distance/calculate';
import { binaryTree } from './generator/binary-tree/binaryTree';
import { huntAntKill } from './generator/hunt-and-kill/huntAndKill';
import { recursiveBacktracker } from './generator/recursive-backtracker/recursiveBacktracker';
import { Grid } from './grid/Grid';
import { MaskedGrid } from './grid/MaskedGrid';
import { PolarGrid } from './grid/PolarGrid';
import { fromTemplate } from './mask/fromTemplate';
import { Basic } from './render/Basic';
import { Colored } from './render/Colored';
import { Canvas } from './render/engine/canvas/Canvas';
import { Circle } from './render/engine/canvas/Circle';
import './maze-solver.css';

document.body.innerHTML = `
<main>
  <h1>Maze Solver</h1>
  <div id="maze"></div>
  <aside>
    <h2>Settings</h2>
    <div>
      <label for="shape">Shape</label>
      <select id="shape">
        <option value="rectangle">Rectangle</option>
        <option value="circle">Circle</option>
        <option value="mask">Mask</option>
      </select>
    </div>
    <div>
      <label for="columns">Columns</label>
      <select id="columns">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
        <option value="60">60</option>
      </select>
    </div>
    <div>
      <label for="rows">Rows</label>
      <select id="rows">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
        <option value="60">60</option>
      </select>
    </div>
    <div>
      <label for="generator">Generator</label>
      <select id="generator">
        <option value="binary-tree">Binary tree</option>
        <option value="hunt-and-kill">Hunt and kill</option>
        <option value="recursive-backtracker">Recursive Backtracker</option>
      </select>
    </div>
    <div id="mask-settings" style="display: none;">
      <label for="mask">Mask</label>
      <textarea id="mask" placeholder="Enter mask data" rows="10" cols="30">
x........x
....xx....
...xxxx...
....xx....
x........x
x........x
....xx....
...xxxx...
....xx....
x........x
      </textarea>
    </div>
    <div>
      <label for="distance">Distance</label>
      <input type="checkbox" id="distance" />
    </div>
    <button id="generate">Generate Maze</button>
  </aside>
</main>
`;

function createGridFactory(shape: string, columns: number, rows: number): Grid {
  switch (shape) {
    case 'rectangle':
      return Grid.factory({
        columns,
        rows,
      });
    case 'circle':
      return PolarGrid.factory({
        columns,
        rows,
      });
    default:
      throw new Error('Unknown shape');
  }
}

function createGenerator(generator: string, grid: Grid): Grid {
  switch (generator) {
    case 'binary-tree':
      return binaryTree(() => grid);
    case 'hunt-and-kill':
      return huntAntKill(() => grid);
    case 'recursive-backtracker':
      return recursiveBacktracker(() => grid);
    default:
      throw new Error('Unknown generator');
  }
}

const shapeSelect = document.getElementById('shape');
const columnsSelect = document.getElementById('columns');
const rowsSelect = document.getElementById('rows');
const maskSettings = document.getElementById('mask-settings');

if (
  shapeSelect === null ||
  columnsSelect === null ||
  rowsSelect === null ||
  maskSettings === null
) {
  throw new Error('Elements not found');
}

shapeSelect.addEventListener('change', (event) => {
  const value = (event.target as HTMLSelectElement)?.value;

  if (value === 'mask') {
    maskSettings.style.display = 'block';
    columnsSelect.style.display = 'none';
    rowsSelect.style.display = 'none';
  } else {
    maskSettings.style.display = 'none';
    columnsSelect.style.display = 'block';
    rowsSelect.style.display = 'block';
  }
});

document.getElementById('generate')?.addEventListener('click', () => {
  const shape = (shapeSelect as HTMLSelectElement).value;
  const generator = (document.getElementById('generator') as HTMLSelectElement)
    ?.value;
  const distance = (document.getElementById('distance') as HTMLInputElement)
    ?.checked;
  const target = document.getElementById('maze');

  if (target === null) {
    throw new Error('Target element not found');
  }

  let renderer: Renderer | undefined;
  target.innerHTML = '';

  let baseGrid: Grid;

  if (shape === 'mask') {
    baseGrid = MaskedGrid.factory(
      fromTemplate(
        (document.getElementById('mask') as HTMLTextAreaElement).value,
      ),
    );
  } else {
    baseGrid = createGridFactory(
      shape,
      parseInt((columnsSelect as HTMLSelectElement).value),
      parseInt((rowsSelect as HTMLSelectElement).value),
    );
  }

  const grid = createGenerator(generator, baseGrid);

  if (shape === 'rectangle' || shape === 'mask') {
    if (distance) {
      renderer = new Colored(
        grid,
        new Canvas(),
        calculate(grid.getRandomCell()),
      );
    } else {
      renderer = new Basic(grid, new Canvas());
    }
  } else if (shape === 'circle') {
    if (distance) {
      renderer = new Colored(
        grid,
        new Circle(),
        calculate(grid.getRandomCell()),
      );
    } else {
      renderer = new Basic(grid, new Circle());
    }
  }

  if (renderer === undefined) {
    throw new Error('Renderer is undefined');
  }

  renderer.render(target);
});
