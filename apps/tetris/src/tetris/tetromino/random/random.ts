import { random as randomNumber } from '@apestaartje/number/random';

import { Tetromino } from '../Tetromino';
import { Type } from '../Type';
import { factory } from '../factory/factory';

import { createTypeList } from './createTypeList';

export const random: () => Tetromino = ((): (() => Tetromino) => {
  let shapes: Type[] = createTypeList(4);

  return (): Tetromino => {
    const index: number = randomNumber(0, shapes.length - 1);
    const tetromino: Tetromino = factory(shapes[index]);

    shapes.splice(index, 1);

    if (shapes.length === 0) {
      shapes = createTypeList(4);
    }

    return tetromino;
  };
})();
