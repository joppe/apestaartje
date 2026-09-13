import { Observable } from '@apestaartje/observable/observable/Observable';
import type { Subscription } from '@apestaartje/observable/observable/Subscription';
import type { SafeObserver } from '@apestaartje/observable/observer/SafeObserver';

import type { Control } from './Control';

import { type Action, ACTION } from './Action';

const SPACE: string = ' ';
const RESET: string = 'a';

export function keyboard(): Control {
  return new Observable<Action>(
    (observer: SafeObserver<Action>): Subscription => {
      function handle(event: KeyboardEvent): void {
        switch (event.key) {
          case SPACE:
            observer.next(ACTION.Start);
            break;
          case RESET:
            observer.next(ACTION.Reset);
            break;
        }
      }

      window.addEventListener('keydown', handle);

      return {
        unsubscribe(): void {
          window.removeEventListener('keydown', handle);
        },
      };
    },
  );
}
