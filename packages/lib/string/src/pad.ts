import { repeat } from './repeat';

/**
 * Put a character in front (or at the end) of a string.
 *
 * The technique used is to create an array of fixed length and join the (empty) parts together
 * with the provided char.
 */

/**
 * Indicates if the characters are used as prefix or as suffix
 */
export enum PadType {
  Left,
  Right,
}

export function pad(
  input: string,
  char: string,
  length: number,
  type: PadType = PadType.Right,
): string {
  let output: string = input.toString();

  // only add characters if the output string is not of the desired length
  if (output.length < length) {
    const count: number = length - output.length;
    const affix: string = repeat(char, count);

    if (PadType.Left === type) {
      output = affix + output;
    } else if (PadType.Right === type) {
      output += affix;
    }
  }

  return output;
}
