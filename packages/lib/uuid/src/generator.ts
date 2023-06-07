import { generate } from './generate';
import { placeholder } from './placeholder';

const PARTS: number[] = [8, 4, 4, 4, 12];
const CHAR = '.';
const GLUE = '-';

type UUIDStore = {
  [id: string]: boolean;
};

export function generator(
  parts: number[] = PARTS,
  char: string = CHAR,
  glue: string = GLUE,
): () => string {
  const blueprint: string = placeholder(parts, char, glue);
  const store: UUIDStore = {};

  return (): string => {
    let uuid: string | undefined;

    do {
      uuid = generate(blueprint, char);
    } while (store[uuid] !== undefined);

    store[uuid] = true;

    return uuid;
  };
}
