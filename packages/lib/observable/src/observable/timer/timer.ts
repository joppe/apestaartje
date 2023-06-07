import { Timer } from '../../data-source/timer/Timer';
import { SafeObserver } from '../../observer/SafeObserver';
import { Observable } from '../Observable';
import { Subscription } from '../Subscription';

export function timer(duration: number, delay = 1000): Observable<number> {
  return new Observable<number>(
    (observer: SafeObserver<number>): Subscription => {
      // Our data source coupled to our observer.
      const t: Timer = new Timer(
        {
          onComplete: (): void => {
            observer.complete();
          },
          onData: (value: number): void => {
            observer.next(value);
          },
        },
        duration,
        delay,
      );

      return {
        unsubscribe(): void {
          t.destroy();
        },
      };
    },
  );
}
