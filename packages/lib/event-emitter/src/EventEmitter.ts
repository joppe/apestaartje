import type { Listener } from './types/Listener';
import type { Unregister } from './types/Unregister';

export type Events = Record<string, Listener<unknown>>;

export class EventEmitter<EventRegistry extends Events> {
  private readonly _listeners: Record<string, Listener<unknown>[]> = {};

  public on<Event extends keyof EventRegistry>(
    event: Event,
    listener: EventRegistry[Event],
  ): Unregister {
    if (this._listeners[event as string] === undefined) {
      this._listeners[event as string] = [];
    }

    this._listeners[event as string].push(listener);

    return () => {
      this.off(event, listener);
    };
  }

  public off<Event extends keyof EventRegistry>(
    event: Event,
    listener: EventRegistry[Event],
  ): void {
    if (this._listeners[event as string] === undefined) {
      return;
    }

    this._listeners[event as string] = this._listeners[event as string].filter(
      (registeredListener) => registeredListener !== listener,
    );
  }

  public emit<Event extends keyof EventRegistry>(
    event: Event,
    payload: EventRegistry[Event],
  ): void {
    if (this._listeners[event as string] === undefined) {
      return;
    }

    this._listeners[event as string].forEach((listener) =>
      listener(event as string, payload),
    );
  }
}
