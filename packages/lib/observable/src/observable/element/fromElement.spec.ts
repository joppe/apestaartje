import { Observable } from '../Observable';
import { Subscription } from '../Subscription';

import { fromElement } from './fromElement';

type NextableObserver<T> = { next(v: T): void };
type ErrorableObserver = { error(e: Error): void };
type CompletableObserver = { complete(): void };
type CompleteObserver<T> = NextableObserver<T> &
  ErrorableObserver &
  CompletableObserver;

describe('fromElement', (): void => {
  let el: HTMLAnchorElement;

  const observer: CompleteObserver<Event> = {
    next(): void {
      // nothing
    },
    error(): void {
      // nothing
    },
    complete(): void {
      // nothing
    },
  };

  beforeEach((): void => {
    el = document.createElement('a');
  });

  it('return an observable that emits values when the event occurs', (): void => {
    const observable: Observable<Event> = fromElement(el, 'click');
    const nextSpy = jest.spyOn(observer, 'next');

    observable.subscribe(observer);
    el.click();

    expect(nextSpy).toHaveBeenCalled();
  });

  it('when unsubscribed, the event listener will be removed', (): void => {
    const observable: Observable<Event> = fromElement(el, 'click');
    const removeEventListenerSpy = jest.spyOn(el, 'removeEventListener');
    const subscription: Subscription = observable.subscribe(observer);

    el.click();
    subscription.unsubscribe();

    expect(removeEventListenerSpy).toHaveBeenCalled();
  });
});
