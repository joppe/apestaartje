import { Animator } from '@apestaartje/animation/animator/Animator';
import { Chronometer } from '@apestaartje/animation/animator/Chronometer';
import { Stage } from '@apestaartje/animation/stage/Stage';
import { Size } from '@apestaartje/geometry/size/Size';

import { Mapping } from './Mapping';
import { NervousMatrix } from './NervousMatrix';

const size: Size = {
  width: 600,
  height: 600,
};
const mapping: Mapping = {
  1: 6,
  2: 7,
  3: 8,
  4: 11,
  5: 12,
  6: 13,
  7: 16,
  8: 17,
  9: 18,
};

export function app(container: HTMLElement): void {
  const matrix: NervousMatrix = new NervousMatrix({
    cols: 6,
    rows: 6,
    distance: 100,
    displacement: 120,
    offset: 50,
    c: 0.8,
    k: 8,
    mapping,
    size,
    container,
  });

  const stage = new Stage(size);
  stage.createLayer('foreground', 10).addAsset(matrix, 'matrix', 10);

  const animator = new Animator((time: Chronometer): boolean => {
    stage.render(time);

    return true;
  });

  container.appendChild(stage.element);

  animator.start();
}
