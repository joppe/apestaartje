import { element } from '@apestaartje/element/element';

import { Grid } from '../grid/Grid';
import { Tiles } from '../tiles/Tiles';

import './container.css';

export function container(grid: Grid, tiles: Tiles): HTMLElement {
  const el = element(['div', { class: 'container' }]);

  el.appendChild(grid.render());
  el.appendChild(tiles.render());

  return el;
}
