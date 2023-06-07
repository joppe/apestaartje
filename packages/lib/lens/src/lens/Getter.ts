export type Getter<T> = (obj: T) => T[keyof T];
