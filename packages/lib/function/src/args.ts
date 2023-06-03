/**
 * Get the argument names of a function.
 */

const IS_CLASS_RE = /^class\s*/;
const ARGUMENTS_RE =
  /^function(?:\s+[\w$]+)?\s*\(([\w$,\s]*)\)\s*{|\(([\w$,\s]*)\)\s*=>|([\w$,\s]*)\s*=>/im;
const CONSTRUCTOR_RE = /\sconstructor\s*\(([\w$,\s]*)\)\s*{/im;
const ARGUMENT_SEPARATOR = ',';

// eslint-disable-next-line @typescript-eslint/ban-types
export function args(func: Function): string[] {
  const str: string = func.toString();
  let matches: RegExpMatchArray | null;

  if (IS_CLASS_RE.test(str)) {
    matches = str.match(CONSTRUCTOR_RE);

    if (matches === null) {
      return [];
    }
  } else {
    matches = str.match(ARGUMENTS_RE);

    if (matches === null) {
      throw new Error('Not a valid function');
    }
  }

  const result: string[] = matches.filter(
    (arg: string): boolean => arg !== undefined,
  );

  if (result.length !== 2) {
    return [];
  }

  return result[1]
    .split(ARGUMENT_SEPARATOR)
    .map((arg: string): string => arg.trim())
    .filter((arg: string): boolean => arg !== '');
}
