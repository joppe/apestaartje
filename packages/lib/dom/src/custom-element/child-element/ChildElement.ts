export function ChildElement(selector: string): PropertyDecorator {
  return (target: object, propertyName: string | symbol): void => {
    Object.defineProperty(target, propertyName, {
      enumerable: true,
      get: function (): HTMLElement | null {
        const self = <HTMLElement>this;

        if (self.shadowRoot) {
          return self.shadowRoot.querySelector(selector);
        }

        return self.querySelector(selector);
      },
      set: (): void => {
        throw new Error(
          'Do not try to set the value of a decorated "@ChildElement" property',
        );
      },
    });
  };
}
