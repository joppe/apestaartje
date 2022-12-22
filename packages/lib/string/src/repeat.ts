/**
 * Repeat a given string a number of times.
 */

export function repeat(input: string, count: number): string {
  if (Number.isInteger(count) === false) {
    throw new Error(`Count must be an integer, ${count} given`);
  }

  if (count < 1) {
    throw new Error(`Count must be a positive number, ${count} given.`);
  }

  // the count is always one extra (with join two parts become one)
  return Array.from({ length: Math.floor(count) + 1 }).join(input);
}
