import { args } from '@apestaartje/function/args';
import type { Constructor } from '@apestaartje/types/Constructor';

import type { Container } from '../container/Container';
import { getContainer } from '../container/getContainer';

const CONSTRUCTOR_NAME = 'name';

/**
 * Class decorator
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Injectable<T extends Constructor<any>>(
  name?: string,
): (target: T) => T {
  return (target: T): T => {
    const di: Container = getContainer();
    const identifier: string =
      name === undefined ? target[CONSTRUCTOR_NAME] : name;
    const requiredDependencies: string[] = args(target);

    di.register(
      identifier,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (dependencies: any[]): T => {
        return new (target.bind(target, dependencies))();
      },
      requiredDependencies,
    );

    return target;
  };
}
