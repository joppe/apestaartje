export function ChildElements(selector: string): PropertyDecorator {
  return (target: object, propertyName: string | symbol): void => {
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
