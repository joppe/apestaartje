import type { Subscription } from '@apestaartje/observable/observable/Subscription';
import { CurrentValueSubject } from '@apestaartje/observable/subject/CurrentValueSubject';

export class Store<T extends object> {
  private _state: T;
  private readonly _subjects: {
    [K in keyof T]?: CurrentValueSubject<T[K]>;
  } = {};

  public constructor(initial: T) {
    this._state = { ...initial };
  }

  public get<P extends keyof T>(key: P): T[P] {
    return this._state[key];
  }

  public set<P extends keyof T>(key: P, value: T[P]): void {
    this._state = {
      ...this._state,
      [key]: value,
    };

    this._subjects[key]?.next(value);
  }

  public subscribe<P extends keyof T>(
    key: P,
    handler: (value: T[P]) => void,
  ): Subscription {
    let subject = this._subjects[key];

    if (subject === undefined) {
      subject = new CurrentValueSubject<T[P]>(this.get(key));
      this._subjects[key] = subject;
    }

    return subject.subscribe({
      next: handler,
    });
  }
}
