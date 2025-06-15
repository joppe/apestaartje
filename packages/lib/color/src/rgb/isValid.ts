import type { RGB } from './RGB';

export function isValid(rgb: RGB): boolean {
  const properties: (keyof RGB)[] = ['r', 'g', 'b'];

  return properties.every((property: keyof RGB): boolean => {
    const part: number = rgb[property];

    return part >= 0 && part <= 255;
  });
}
