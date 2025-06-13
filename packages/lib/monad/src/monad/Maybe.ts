const None = Symbol('None');

type Matcher<T, R> = {
  some: (value: T) => R;
  none: () => R;
};

export class Maybe<T> {
  private readonly value: T | typeof None;

  private constructor(value: T | typeof None) {
    this.value = value;
  }

  public map<R>(f: (value: T) => R): Maybe<R> {
    if (this.value === None) {
      return Maybe.none();
    }

    return Maybe.some(f(this.value));
  }

  public flatMap<R>(f: (value: T) => Maybe<R>): Maybe<R> {
    if (this.value === None) {
      return Maybe.none();
    }

    return f(this.value);
  }

  public match<R>(matcher: Matcher<T, R>): R {
    if (this.value === None) {
      return matcher.none();
    }

    return matcher.some(this.value);
  }

  static some<T>(value: T): Maybe<T> {
    return new Maybe(value);
  }

  static none<T>(): Maybe<T> {
    return new Maybe<T>(None);
  }

  static from<T>(value: T | undefined): Maybe<T> {
    return value === undefined ? Maybe.none() : Maybe.some(value);
  }
}
