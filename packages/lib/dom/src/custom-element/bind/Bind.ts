// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
function isFunction(value: any): value is Function {
  if (typeof value === 'function') {
    return true;
  }

  return false;
}

export function Bind(): MethodDecorator {
  return <T>(
    // eslint-disable-next-line @typescript-eslint/ban-types
    _target: Object,
    _propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>,
  ): TypedPropertyDescriptor<T> => {
    const func = descriptor.value;

    if (!isFunction(func)) {
      throw new Error(
        `Bind decorator can only be applied to methods, no "${typeof descriptor.value}"`,
      );
    }

    let bound: T | undefined;

    return {
      get(): T {
        if (bound === undefined) {
          bound = func.bind(this) as T;
        }

        return bound;
      },
      set(): void {
        throw new Error(
          'Do not try to set the value of a decorated "@Bind" method',
        );
      },
    };
  };
}
