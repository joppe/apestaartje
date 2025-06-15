import type { RGB } from './RGB';

function getPart(part: number): string {
  const s: string = part.toString(16);

  if (s.length === 2) {
    return s;
  }

  return `0${s}`;
}

export function toString(color: RGB): string {
  return `#${getPart(color.r)}${getPart(color.g)}${getPart(color.b)}`;
}
