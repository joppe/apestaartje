import { Config } from './Config';
import { InputType } from './InputType';
import { castValue } from './castValue';

const OBSERVED_ATTRIBUTES = 'observedAttributes';

export function Input(config: Config = {}): PropertyDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
  return (target: any, propertyKey: string | symbol): void => {
    const propertyName = String(propertyKey);
    const attribute =
      config.attribute === undefined ? propertyName : config.attribute;
    const type: InputType =
      config.type === undefined ? InputType.Str : config.type;

    if (config.watch === true) {
      let observedAttributes: string[] = [];

      if (Array.isArray(target[OBSERVED_ATTRIBUTES])) {
        observedAttributes = <string[]>target[OBSERVED_ATTRIBUTES];
      }

      Object.defineProperty(target.constructor, OBSERVED_ATTRIBUTES, {
        configurable: true,
        get: (): string[] => {
          return observedAttributes.concat(attribute);
        },
        set: (): void => {
          throw new Error(
            'Do not try to set the value of "observedAttributes"',
          );
        },
      });
    }

    Object.defineProperty(target, propertyName, {
      enumerable: true,
      get: function (): string | number | boolean | object | undefined {
        return castValue((<HTMLElement>this).getAttribute(attribute), type);
      },
      set: (): void => {
        throw new Error(
          'Do not try to set the value of a decorated "@Input" property',
        );
      },
    });
  };
}
