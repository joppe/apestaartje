import { element } from '@apestaartje/element/element';

import type { Grid } from '../grid/Grid';
import type { Tiles } from '../tiles/Tiles';

import './container.css';

export function container(grid: Grid, tiles: Tiles): HTMLElement {
  const el = element(['div', { class: 'container' }]);

  el.appendChild(grid.render());
  el.appendChild(tiles.render());

  return el;
}
