export type Setter<T> = (value: T[keyof T], obj: T) => T;
