import { CurrentValueSubject } from './CurrentValueSubject';

type NextableObserver<T> = { next(v: T): void };

describe('CurrentValueSubject', (): void => {
  const observer: NextableObserver<number> = {
    next(): void {
      // nothing
    },
  };

  it('once subscribed immediately emits the current value', (): void => {
    const nextSpy = jest.spyOn(observer, 'next');
    const currentValue: CurrentValueSubject<number> =
      new CurrentValueSubject<number>(101);

    currentValue.subscribe(observer);

    expect(nextSpy).toHaveBeenCalledWith(101);
    currentValue.next(2);
    expect(nextSpy).toHaveBeenCalledWith(2);
  });
});
