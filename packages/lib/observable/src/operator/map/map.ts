import { Observable } from '../../observable/Observable';
import { Subscription } from '../../observable/Subscription';
import { SafeObserver } from '../../observer/SafeObserver';
import { Operator } from '../Operator';

import { MapFunction } from './MapFunction';

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
