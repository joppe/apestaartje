import { Observable } from '../../observable/Observable';
import type { Subscriber } from '../../observable/Subscriber';
import type { Subscription } from '../../observable/Subscription';
import type { SafeObserver } from '../../observer/SafeObserver';
import type { Operator } from '../Operator';

import { filter } from './filter';

type NextableObserver<T> = { next(v: T): void };
type ErrorableObserver = { error(e: Error): void };
type CompletableObserver = { complete(): void };
type CompleteObserver<T> = NextableObserver<T> &
  ErrorableObserver &
  CompletableObserver;

describe('filter', (): void => {
  let next: (v: number) => void;
  let observable: Observable<number>;
  let subscriber: Subscriber<number>;

  beforeEach((): void => {
    subscriber = (o: SafeObserver<number>): Subscription => {
      next = (v: number): void => {
        o.next(v);
      };

      return {
        unsubscribe(): void {
          // nothing
        },
      };
    };

    observable = new Observable<number>(subscriber);
  });

  it('only emits values that are not filtered out', (): void => {
    const f: Operator<number, number> = filter<number>(
      (value: number): boolean => {
        return value % 2 === 0;
      },
    );
    const o: CompleteObserver<number> = {
      next(): void {
        // nothing
      },
      error(): void {
        // nothing
      },
      complete(): void {
        // nothing
      },
    };
    const filtered: Observable<number> = f(observable);
    const nextSpy = jest.spyOn(o, 'next');

    filtered.subscribe(o);

    next(0);
    expect(nextSpy).toHaveBeenCalledWith(0);
    nextSpy.mockClear();
    next(1);
    expect(nextSpy).not.toHaveBeenCalled();
    nextSpy.mockClear();
    next(16);
    expect(nextSpy).toHaveBeenCalledWith(16);
  });
});
