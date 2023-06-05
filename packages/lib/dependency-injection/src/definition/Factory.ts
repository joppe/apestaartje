/**
 * A function that can create a dependency.
 */

export interface Factory<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (...args: any[]): T;
}
