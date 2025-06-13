export class Monad<T> {
  private readonly value: T;

  constructor(value: T) {
    this.value = value;
  }

  map<U>(f: (x: T) => U): Monad<U> {
    return new Monad(f(this.value));
  }

  flatMap<U>(f: (x: T) => Monad<U>): Monad<U> {
    return f(this.value);
  }

  get(): T {
    return this.value;
  }
}
