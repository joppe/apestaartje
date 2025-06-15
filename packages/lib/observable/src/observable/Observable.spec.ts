import type { SafeObserver } from '../observer/SafeObserver';
import type { Operator } from '../operator/Operator';
import { map } from '../operator/map/map';

import { Observable } from './Observable';
import type { Subscriber } from './Subscriber';
import type { Subscription } from './Subscription';

type NextableObserver<T> = { next(v: T): void };
type ErrorableObserver = { error(e: Error): void };
type CompletableObserver = { complete(): void };
type CompleteObserver<T> = NextableObserver<T> &
  ErrorableObserver &
  CompletableObserver;

describe('Observable', (): void => {
  let next: (v: number) => void;
  let complete: () => void;
  let error: (err: Error) => void;
  let observable: Observable<number>;
  let subscriber: Subscriber<number>;
  let subscriberCalled: boolean;
  let subscriberCalledCount: number;

  const observerNumber: CompleteObserver<number> = {
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
  const observerBoolean: CompleteObserver<boolean> = {
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
  const subscription: Subscription = {
    unsubscribe(): void {
      // nothing
    },
  };

  beforeEach((): void => {
    subscriberCalled = false;
    subscriberCalledCount = 0;

    subscriber = (o: SafeObserver<number>): Subscription => {
      subscriberCalled = true;
      subscriberCalledCount += 1;

      next = (v: number): void => {
        o.next(v);
      };

      complete = (): void => {
        o.complete();
      };

      error = (err: Error): void => {
        o.error(err);
      };

      return subscription;
    };

    observable = new Observable<number>(subscriber);
  });

  describe('constructor', (): void => {
    it('the subscriber is stored but not executed', (): void => {
      expect(subscriberCalled).toBe(false);
    });
  });

  describe('subscribe', (): void => {
    it('the subscriber is called when the subscribe method is called', (): void => {
      observable.subscribe(observerNumber);

      expect(subscriberCalled).toBe(true);
    });

    it('the data source subscription is unsubscribed when the observer unsubscribes', (): void => {
      const unsubscibeSpy = jest.spyOn(subscription, 'unsubscribe');
      const sub: Subscription = observable.subscribe(observerNumber);

      sub.unsubscribe();

      expect(unsubscibeSpy).toHaveBeenCalled();
    });

    it('when the data source emits a value, that value is passed to the next method of the observer', (): void => {
      const nextSpy = jest.spyOn(observerNumber, 'next');

      observable.subscribe(observerNumber);
      next(9);

      expect(nextSpy).toHaveBeenCalledWith(9);
    });

    it("when finished doesn't receive new values via next", (): void => {
      const nextSpy = jest.spyOn(observerNumber, 'next');

      nextSpy.mockClear();

      observable.subscribe(observerNumber);
      complete();
      next(88);

      expect(nextSpy).not.toHaveBeenCalled();
    });

    it("when unsubscribed doesn't receive new values via next", (): void => {
      const nextSpy = jest.spyOn(observerNumber, 'next');
      const s: Subscription = observable.subscribe(observerNumber);

      nextSpy.mockClear();

      s.unsubscribe();
      next(34);

      expect(nextSpy).not.toHaveBeenCalled();
    });

    it('when an error occurs the error method is called', (): void => {
      const errorSpy = jest.spyOn(observerNumber, 'error');
      const e: Error = new Error('?');

      observable.subscribe(observerNumber);
      error(e);

      expect(errorSpy).toHaveBeenCalledWith(e);
    });

    it('an observable is unicast, calls the subscriber for each subscription', (): void => {
      const o2: NextableObserver<number> = {
        next(): void {
          // nothing
        },
      };
      const nextSpy1 = jest.spyOn(observerNumber, 'next');
      const nextSpy2 = jest.spyOn(o2, 'next');
      const s1: Subscription = observable.subscribe(observerNumber);

      nextSpy1.mockClear();

      observable.subscribe(o2);

      s1.unsubscribe();
      next(102);

      expect(subscriberCalledCount).toEqual(2);
      expect(nextSpy1).not.toHaveBeenCalled();
      expect(nextSpy2).toHaveBeenCalledWith(102);
    });
  });

  describe('pipe', (): void => {
    it('applies the given operators to the emitted values', (): void => {
      const nextSpy = jest.spyOn(observerBoolean, 'next');
      const double: Operator<number, number> = map<number, number>(
        (value: number): number => {
          return value * 2;
        },
      );
      const isMultipleOf3: Operator<number, boolean> = map<number, boolean>(
        (value: number): boolean => {
          return value % 3 === 0;
        },
      );
      const result: Observable<boolean> = observable.pipe(
        double,
        isMultipleOf3,
      );

      result.subscribe(observerBoolean);

      next(3);
      expect(nextSpy).toHaveBeenCalledWith(true);
      next(16);
      expect(nextSpy).toHaveBeenCalledWith(false);
    });
  });
});
