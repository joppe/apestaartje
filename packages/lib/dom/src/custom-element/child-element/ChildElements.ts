export function ChildElements(selector: string): PropertyDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (target: Object, propertyName: string | symbol): void => {
    Object.defineProperty(target, propertyName, {
      enumerable: true,
      get: function (): HTMLElement[] {
        const self: HTMLElement = <HTMLElement>this;

        if (self.shadowRoot) {
          return Array.from(self.shadowRoot.querySelectorAll(selector));
        }

        return Array.from(self.querySelectorAll(selector));
      },
      set: (): void => {
        throw new Error(
          'Do not try to set the value of a decorated "@ChildElements" property',
        );
      },
    });
  };
}
