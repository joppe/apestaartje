/**
 * To get the indices of a tuple, first get the keys. This will return all properties/methods on an array and the strinified indices of the tuple. By excluding the array of keys with the keys of a random array, the indices remain.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
export type TupleKeys<T extends ReadonlyArray<any>> = Exclude<
  keyof T,
  keyof any[]
>;
