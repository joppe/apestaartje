import { Animator } from '@apestaartje/animation/animator/Animator';
import type { Chronometer } from '@apestaartje/animation/animator/Chronometer';
import { Stage } from '@apestaartje/animation/stage/Stage';
import { element } from '@apestaartje/element/element';
import { factory } from '@apestaartje/store/factory';

import type { Config } from './types/Config';
import type { Data, State } from './types/Data';

import { Universe } from '../../wasm';
import styles from './gameOfLife.module.css';
import { toolbar } from './toolbar/toolbar';
import { tools } from './tools/tools';
import { Visualizer } from './visualizer/Visualizer';

type GameOfLifeProps = {
  container: HTMLElement;
  config: Config;
};

export function gameOfLife({ container, config }: GameOfLifeProps) {
  const store = factory<Data>({ state: 'idle' });
  const cellSize = config.cell.size;
  const borderWidth = config.cell.border;

  const universe = Universe.new();
  const width = universe.width();
  const height = universe.height();

  const stage = new Stage({
    width: (cellSize + borderWidth) * width + borderWidth,
    height: (cellSize + borderWidth) * height + borderWidth,
  });
  const layer = stage.createLayer();
  const visual = new Visualizer({
    universe,
    config,
  });
  const tool = tools({
    stage,
    universe,
    cellSize: cellSize + borderWidth,
  });

  layer.addAsset(visual);

  const animator = new Animator((time: Chronometer): boolean => {
    stage.tick(time);
    stage.render();

    return true;
  });

  const app = element([
    'div',
    { class: styles.app },
    [toolbar({ store }), stage.element],
  ]);

  container.appendChild(app);
  stage.render();

  store.subscribe('state', (state: State) => {
    let shouldPlay = false;

    switch (state) {
      case 'play':
        tool.stop();
        shouldPlay = true;
        break;
      case 'reset':
        tool.stop();
        universe.reset();
        stage.render();
        store.set('state', 'idle');
        break;
      case 'blank':
        tool.stop();
        universe.erase();
        stage.render();
        store.set('state', 'idle');
        break;
      case 'erase':
        tool.enableErasing();
        break;
      case 'draw':
        tool.enableDrawing();
        break;
    }

    if (shouldPlay && !animator.isPlaying()) {
      animator.start();
    }

    if (!shouldPlay && animator.isPlaying()) {
      animator.stop();
    }
  });
}
