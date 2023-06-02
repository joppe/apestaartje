import { range } from './range';

describe('range', (): void => {
  it('return an iterator that spans a given range', (): void => {
    const r: IterableIterator<number> = range(0, 10, 1);
    let count = 0;

    for (const i of r) {
      expect(i).toBe(count);
      count += 1;
    }
  });
});
