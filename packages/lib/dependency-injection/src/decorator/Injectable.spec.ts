import type { Container as DIContainer } from '../container/Container';
import { getContainer } from '../container/getContainer';

import { Injectable } from './Injectable';

describe('Injectable', (): void => {
  it('resolve value from di container', (): void => {
    const di: DIContainer = getContainer();

    di.register<number>('a', () => {
      return 16;
    });

    @Injectable()
    class Adder {
      private readonly _a: number;

      constructor(a: number) {
        this._a = a;
      }

      public add(b: number): number {
        return this._a + b;
      }
    }

    const adder: Adder = di.resolve<Adder>('Adder');

    expect(adder.add(3)).toBe(19);
  });
});
