import { Definition } from '../definition/Definition';
import type { Factory } from '../definition/Factory';

/**
 * The DI container
 */

export class Container {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly _registry: Record<string, Definition<any>> = {};

  public register<T>(
    identifier: string,
    factory: Factory<T>,
    requiredDependencies?: string[],
  ): void {
    this._registry[identifier] = new Definition<T>(
      factory,
      requiredDependencies,
    );
  }

  public resolve<T>(identifier: string): T {
    const definition: Definition<T> = this.get(identifier);

    definition.requiredDependencies.forEach(
      (requiredDependency: string): void => {
        if (!definition.isDependencyDefined(requiredDependency)) {
          definition.setDependency(
            requiredDependency,
            this.resolve(requiredDependency),
          );
        }
      },
    );

    return definition.invoke();
  }

  public has(identifier: string): boolean {
    return this._registry[identifier] !== undefined;
  }

  public get<T>(identifier: string): Definition<T> {
    if (!this.has(identifier)) {
      throw new Error(`Container.resolve, unknown identifier: "${identifier}"`);
    }

    return this._registry[identifier];
  }
}
