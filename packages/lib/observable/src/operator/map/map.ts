import { Observable } from '../../observable/Observable';
import type { Subscription } from '../../observable/Subscription';
import type { SafeObserver } from '../../observer/SafeObserver';
import type { Operator } from '../Operator';

import type { MapFunction } from './MapFunction';

export function map<T, K>(transform: MapFunction<T, K>): Operator<T, K> {
  return (observable: Observable<T>): Observable<K> => {
    return new Observable<K>((observer: SafeObserver<K>): Subscription => {
      return observable.subscribe({
        next: (value: T): void => {
          observer.next(transform(value));
        },
        error: (err: Error): void => {
          observer.error(err);
        },
        complete: (): void => {
          observer.complete();
        },
      });
    });
  };
}
