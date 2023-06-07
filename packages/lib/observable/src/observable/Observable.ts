import { Observer } from '../observer/Observer';
import { SafeObserver } from '../observer/SafeObserver';
import { Operator } from '../operator/Operator';

import { Subscriber } from './Subscriber';
import { Subscription } from './Subscription';

export class Observable<T> {
  private readonly _subscriber: Subscriber<T>;

  constructor(subscriber: Subscriber<T>) {
    this._subscriber = subscriber;
  }

  /**
   * Couple the subscriber with the observer, creating the subscription.
   * The subscriber encapsulates a datasource. It will call the
   * `next`/`complete`/`error` methods on the provided observer.
   */
  public subscribe(observer: Observer<T>): Subscription {
    const safeObserver: SafeObserver<T> = new SafeObserver<T>(observer);

    safeObserver.registerSubscription(this._subscriber(safeObserver));

    return {
      unsubscribe(): void {
        safeObserver.unsubscribe();
      },
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public pipe<K>(...operators: Operator<any, any>[]): Observable<K> {
    return operators.reduce(
      (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        observable: Observable<any>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        operator: Operator<any, any>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ): Observable<any> => operator(observable),
      this,
    );
  }
}
