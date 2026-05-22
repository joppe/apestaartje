import type { SafeObserver } from '../../observer/SafeObserver';
import type { Subscription } from '../Subscription';

import { Observable } from '../Observable';

export function fromElement(
  element: HTMLElement,
  eventName: string,
): Observable<Event> {
  return new Observable<Event>(
    (observer: SafeObserver<Event>): Subscription => {
      function handle(event: Event): void {
        observer.next(event);
      }

      element.addEventListener(eventName, handle);

      return {
        unsubscribe(): void {
          element.removeEventListener(eventName, handle);
        },
      };
    },
  );
}
