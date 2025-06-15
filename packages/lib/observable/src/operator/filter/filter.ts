import { Observable } from '../../observable/Observable';
import type { Subscription } from '../../observable/Subscription';
import type { SafeObserver } from '../../observer/SafeObserver';
import type { Operator } from '../Operator';

import type { FilterFunction } from './FilterFunction';

export function filter<T>(predicate: FilterFunction<T>): Operator<T, T> {
  return (observable: Observable<T>): Observable<T> => {
    return new Observable<T>((observer: SafeObserver<T>): Subscription => {
      return observable.subscribe({
        next: (value: T): void => {
          if (predicate(value)) {
            observer.next(value);
          }
        },
        error(err: Error): void {
          observer.error(err);
        },
        complete(): void {
          observer.complete();
        },
      });
    });
  };
}
