/**
 * A Tuple is an array with a fixed number of elements, therefore the length has a number.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IsTuple<T extends ReadonlyArray<any>> = number extends T['length']
  ? false
  : true;
