import { random } from '@apestaartje/number/random';

/**
 * Generate an uuid.
 * Provide a blueprint where all occurrences of "replace" will be replaced by a random hex value.
 */
export function generate(blueprint: string, replace: string): string {
  return blueprint
    .split('')
    .map((c: string): string => {
      if (c === replace) {
        return random(0, 15).toString(16);
      }

      return c;
    })
    .join('');
}
