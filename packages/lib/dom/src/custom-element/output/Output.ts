import type { EventEmitter } from './EventEmitter';

export function Output<T>(eventName: string): PropertyDecorator {
  return (target: object, propertyName: string | symbol): void => {
    Object.defineProperty(target, propertyName, {
      enumerable: true,
      get: function (): EventEmitter<T> {
        const self: HTMLElement = <HTMLElement>this;

        return {
          emit(value: T): void {
            const init: CustomEventInit<T> = {
              detail: value,
              bubbles: true,
              composed: true,
            };

            self.dispatchEvent(new CustomEvent(eventName, init));
          },
        };
      },
      set: (): void => {
        throw new Error(
          'Do not try to set the value of a decorated "@Output" property',
        );
      },
    });
  };
}
