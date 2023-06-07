import { repeat } from '@apestaartje/string/repeat';

/**
 * Create a placeholder string (blueprint) that will be used by the generate function.
 * The placeholder exists of characters that will be replaced in the generate function by a random hex value. The
 * character that will replaced is the `char` argument.
 */
export function placeholder(
  parts: number[],
  char: string,
  glue: string,
): string {
  return parts
    .map((count: number): string => {
      return repeat(char, count);
    })
    .join(glue);
}
