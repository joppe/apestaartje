import type { Observable } from '../observable/Observable';

export type Operator<T, K> = {
  (observable: Observable<T>): Observable<K>;
};
