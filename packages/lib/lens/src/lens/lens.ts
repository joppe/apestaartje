import type { Getter } from './Getter';
import type { Setter } from './Setter';

export type Lens<T> = {
  get: Getter<T>;
  set: Setter<T>;
};

export function lens<T>(getter: Getter<T>, setter: Setter<T>): Lens<T> {
  return {
    get(obj: T): T[keyof T] {
      return getter(obj);
    },

    set(value: T[keyof T], obj: T): T {
      return setter(value, obj);
    },
  };
}
