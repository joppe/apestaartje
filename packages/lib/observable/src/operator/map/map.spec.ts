import { Observable } from '../../observable/Observable';
import { Subscriber } from '../../observable/Subscriber';
import { Subscription } from '../../observable/Subscription';
import { SafeObserver } from '../../observer/SafeObserver';
import { Operator } from '../Operator';

import { map } from './map';

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

  it('maps a value to an other type/value', (): void => {
    const m: Operator<number, boolean> = map<number, boolean>(
      (value: number): boolean => {
        return value % 2 === 0;
      },
    );
    const o: CompleteObserver<boolean> = {
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
    const mapped: Observable<boolean> = m(observable);
    const nextSpy = jest.spyOn(o, 'next');

    mapped.subscribe(o);

    next(0);
    expect(nextSpy).toHaveBeenCalledWith(true);
    next(1);
    expect(nextSpy).toHaveBeenCalledWith(false);
    next(16);
    expect(nextSpy).toHaveBeenCalledWith(true);
  });
});
