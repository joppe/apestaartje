import { Animator } from '@apestaartje/animation/animator/Animator';
import type { Chronometer } from '@apestaartje/animation/animator/Chronometer';
import { Stage } from '@apestaartje/animation/stage/Stage';

import type { Config } from './types/Config';

import { Universe } from '../../wasm';
import { Visualizer } from './visualizer/Visualizer';

type GameOfLifeProps = {
  container: HTMLElement;
  config: Config;
};

export function gameOfLife({ container, config }: GameOfLifeProps) {
  const cellSize = config.cell.size;
  const borderWidth = config.cell.border;

  const universe = Universe.new();
  const width = universe.width();
  const height = universe.height();

  const stage = new Stage({
    width: (cellSize + borderWidth) * width + borderWidth,
    height: (cellSize + borderWidth) * height + borderWidth,
  });
  const layer = stage.createLayer('main', 10);
  const visual = new Visualizer({
    universe,
    config,
  });

  layer.addAsset(visual, 'visual', 100);

  const animator = new Animator((time: Chronometer): boolean => {
    stage.tick(time);
    stage.render();

    return true;
  });

  container.appendChild(stage.element);
  animator.start();
}
