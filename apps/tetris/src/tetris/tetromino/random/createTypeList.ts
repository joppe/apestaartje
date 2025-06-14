import { range } from '@apestaartje/array/iterator/range';

import { Type } from '../Type';

export function createTypeList(repeat: number): Type[] {
  const list: Type[] = [];

  Object.keys(Type).forEach((type: Type): void => {
    for (const _index of range(1, repeat, 1)) {
      list.push(Type[type]);
    }
  });

  return list;
}
