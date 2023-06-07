import { Observable } from '../Observable';

import { timer } from './timer';

type NextableObserver<T> = { next(v: T): void };

describe('timer', (): void => {
  const observer: NextableObserver<number> = {
    next(): void {
      // nothing
    },
  };

  it('will emit for a given time values each number of miliseconds', (done: () => void): void => {
    const nextSpy = jest.spyOn(observer, 'next');
    const t: Observable<number> = timer(10, 200);

    t.subscribe(observer);

    setTimeout((): void => {
      expect(nextSpy).toHaveBeenCalledTimes(10);
      done();
    }, 2500);
  });
});
