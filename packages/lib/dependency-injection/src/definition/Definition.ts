import { args } from '@apestaartje/function/args';

import type { Factory } from './Factory';

/**
 * A dependency definition.
 */
export class Definition<T> {
  private readonly _requiredDependencies: string[];
  private readonly _factory: Factory<T>;
  private _isInvoked = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly _dependencies: Record<string, any> = {};
  private _result: T | undefined;

  get requiredDependencies(): string[] {
    return this._requiredDependencies;
  }

  get isInvoked(): boolean {
    return this._isInvoked;
  }

  constructor(factory: Factory<T>, requiredDependencies?: string[]) {
    this._factory = factory;
    this._requiredDependencies =
      requiredDependencies === undefined
        ? args(this._factory)
        : requiredDependencies;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public setDependency(identifier: string, value: any): void {
    this._dependencies[identifier] = value;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getDependency(identifier: string): any {
    if (!this.isDependencyDefined(identifier)) {
      throw new Error(
        `Definition.getDependency, dependency with name "${identifier}" not defined`,
      );
    }

    return this._dependencies[identifier];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getDependencies(): any[] {
    return this._requiredDependencies.reduce(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (dependencies: any[], identifier: string) => {
        return dependencies.concat(this.getDependency(identifier));
      },
      [],
    );
  }

  public isDependencyDefined(identifier: string): boolean {
    return this._dependencies[identifier] !== undefined;
  }

  public invoke(): T {
    if (!this._isInvoked) {
      this._result = this._factory(...this.getDependencies());
      this._isInvoked = true;
    }

    return this._result as T;
  }
}
