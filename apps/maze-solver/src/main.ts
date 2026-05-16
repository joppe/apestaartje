import type { Mask } from './mask/Mask';

import { calculate } from './distance/calculate';
import { deadEnds } from './generator/deadEnds';
import { huntAntKill } from './generator/hunt-and-kill/huntAndKill';
import { recursiveBacktracker } from './generator/recursive-backtracker/recursiveBacktracker';
import { MaskedGrid } from './grid/MaskedGrid';
import { PolarGrid } from './grid/PolarGrid';
import { fromTemplate } from './mask/fromTemplate';
import { Basic } from './render/Basic';
import { Colored } from './render/Colored';
import { Canvas } from './render/engine/canvas/Canvas';
import { Circle } from './render/engine/canvas/Circle';

function methodHunt(mask: Mask) {
  const grid = huntAntKill(() => {
    return MaskedGrid.factory(mask);
  });
  const distances = calculate(grid.getRandomCell());
  const coloredRenderer = new Colored(grid, new Canvas(), distances);

  coloredRenderer.render(document.body);
  console.log('dea-ends', deadEnds(grid));
}

function methodRecursice(mask: Mask) {
  const grid = recursiveBacktracker(() => {
    return MaskedGrid.factory(mask);
  });
  const distances = calculate(grid.getRandomCell());
  const coloredRenderer = new Colored(grid, new Canvas(), distances);

  coloredRenderer.render(document.body);
  console.log('dead-ends', deadEnds(grid));
}

function circle() {
  const grid = recursiveBacktracker(() => {
    return PolarGrid.factory({ rows: 10, columns: 10 });
  });
  const distances = calculate(grid.getRandomCell());
  const renderer = new Colored(grid, new Circle(), distances);
  //const renderer = new Basic(grid, new Circle());

  renderer.render(document.body);
}

const mask = fromTemplate(`
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
`);

//methodHunt(mask);
methodRecursice(mask);
circle();
