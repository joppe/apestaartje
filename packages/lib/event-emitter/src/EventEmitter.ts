import { Listener } from './types/Listener';
import { Unregister } from './types/Unregister';

type Events = Record<string, unknown>;

export class EventEmitter<
  EventRegistry extends Events,
  Event extends keyof EventRegistry,
> {
  private readonly _listeners: Record<
    string,
    Listener<EventRegistry[Event]>[]
  > = {};

  public on(
    event: Event,
    listener: Listener<EventRegistry[Event]>,
  ): Unregister {
    if (this._listeners[event as string] === undefined) {
      this._listeners[event as string] = [];
    }

    this._listeners[event as string].push(listener);

    return () => {
      this.off(event, listener);
    };
  }

  public off(event: Event, listener: Listener<EventRegistry[Event]>): void {
    if (this._listeners[event as string] === undefined) {
      return;
    }

    this._listeners[event as string] = this._listeners[event as string].filter(
      (registeredListener) => registeredListener !== listener,
    );
  }

  public emit(event: Event, payload: EventRegistry[Event]): void {
    if (this._listeners[event as string] === undefined) {
      return;
    }

    this._listeners[event as string].forEach((listener) =>
      listener(event as string, payload),
    );
  }
}
